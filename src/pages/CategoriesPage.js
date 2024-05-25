import React, { useState, useEffect } from 'react';
import ApiService from '../api/apiService';
import CategoryForm from '../components/category/CategoryForm';
import CategoryList from '../components/category/CategoryList';
import "../styles/pages/CategoriesPage.scss";

const CategoriesPage = () => {
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [revenueCategories, setRevenueCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        ApiService.getCategories()
            .then(response => {
                const expenses = response.data.filter(cat => cat.type === 'EXPENSE');
                const revenues = response.data.filter(cat => cat.type === 'REVENUE');
                setExpenseCategories(expenses);
                setRevenueCategories(revenues);
            })
            .catch(error => console.error('Error fetching categories:', error));
    };

    const handleAddCategory = category => {
        ApiService.addCategory(category)
            .then(response => {
                if (response.data.type === 'EXPENSE') {
                    setExpenseCategories([...expenseCategories, response.data]);
                } else {
                    setRevenueCategories([...revenueCategories, response.data]);
                }
            })
            .catch(error => console.error('Error adding category:', error));
    };

    const handleDeleteCategory = (categoryId, type) => {
        ApiService.deleteCategory(categoryId)
            .then(() => {
                if (type === 'EXPENSE') {
                    setExpenseCategories(expenseCategories.filter(cat => cat.id !== categoryId));
                } else {
                    setRevenueCategories(revenueCategories.filter(cat => cat.id !== categoryId));
                }
            })
            .catch(error => console.error('Error deleting category:', error));
    };

    const handleUpdateCategory = async (categoryId, categoryData) => {
        try {
            const response = await ApiService.updateCategory(categoryId, categoryData);
            const updatedCategory = response.data;
            const currentType = expenseCategories.find(cat => cat.id === categoryId) ? 'EXPENSE' : 'REVENUE';
            const newType = updatedCategory.type;
    
            if (currentType !== newType) {
                // Handle moving category to new type list and updating UI immediately
                if (newType === 'EXPENSE') {
                    setExpenseCategories(prev => [...prev, updatedCategory]);
                    setRevenueCategories(prev => prev.filter(cat => cat.id !== categoryId));
                } else {
                    setRevenueCategories(prev => [...prev, updatedCategory]);
                    setExpenseCategories(prev => prev.filter(cat => cat.id !== categoryId));
                }
            } else {
                // Update the category in its current list
                if (newType === 'EXPENSE') {
                    setExpenseCategories(prev => prev.map(cat => cat.id === categoryId ? updatedCategory : cat));
                } else {
                    setRevenueCategories(prev => prev.map(cat => cat.id === categoryId ? updatedCategory : cat));
                }
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className="categories-page">
            <div className="categories-header">
                <h1>Categories Management</h1>
                <CategoryForm onAddCategory={handleAddCategory} />
            </div>
            <div className="categories-container">
                <div>
                    <h2>Expense Categories</h2>
                    <CategoryList
                        categories={expenseCategories}
                        type="EXPENSE"
                        onUpdateCategory={handleUpdateCategory}
                        onDeleteCategory={handleDeleteCategory}
                    />
                </div>
                <div>
                    <h2>Revenue Categories</h2>
                    <CategoryList
                        categories={revenueCategories}
                        type="REVENUE"
                        onUpdateCategory={handleUpdateCategory}
                        onDeleteCategory={handleDeleteCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
