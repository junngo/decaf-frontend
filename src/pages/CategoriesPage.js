import React, { useState, useEffect } from 'react';
import ApiService from '../api/apiService';
import CategoryForm from '../components/Category/CategoryForm';
import CategoryList from '../components/Category/CategoryList';

const CategoriesPage = () => {
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [revenueCategories, setRevenueCategories] = useState([]);

    useEffect(() => {
        ApiService.getCategories()
            .then(response => {
                const expenses = response.data.filter(cat => cat.type === 'EXPENSE');
                const revenues = response.data.filter(cat => cat.type === 'REVENUE');
                setExpenseCategories(expenses);
                setRevenueCategories(revenues);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

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

    return (
        <div>
            <h1>Categories Management</h1>
            <CategoryForm onAddCategory={handleAddCategory} />
            <div className="categories-container">
                <div>
                    <h2>Expense Categories</h2>
                    <CategoryList categories={expenseCategories} type="EXPENSE" />
                </div>
                <div>
                    <h2>Revenue Categories</h2>
                    <CategoryList categories={revenueCategories} type="REVENUE" />
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
