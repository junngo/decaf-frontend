import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../api/api';

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        refreshCategory()
    }, []);

    const refreshCategory = () => {
        fetchCategories().then(setCategories);
    };

    const handleCategorySubmit = async (category) => {
        if (category.id) {
            await updateCategory(category.id, category);
        } else {
            await createCategory(category);
        }
        refreshCategory();
        setSelectedCategory(null); // Reset selection
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            setCategories(prev => prev.filter(acc => acc.id !== categoryId));
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleCancel = () => {
        setSelectedCategory(null);  // Clear the current selection
    };

    return (
        <div>
            <CategoryForm 
                category={selectedCategory}
                onSubmit={handleCategorySubmit}
                onCancel={handleCancel}
            />
            <CategoryList 
                categories={categories}
                onSelectCategory={handleSelectCategory} 
                onDeleteCategory={handleDeleteCategory}
            />
        </div>
    );
}

export default CategoryManagement;
