import React, { useState } from 'react';
import '../../styles/components/category/CategoryForm.scss';

const CategoryForm = ({ onAddCategory }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('EXPENSE');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddCategory({ name, type });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <input
                type="text"
                value={name}
                placeholder="Category Name"
                onChange={(e) => setName(e.target.value)}
            />
            <div className="category-type-selector">
                <button
                    type="button"
                    onClick={() => setType('EXPENSE')}
                    className={type === 'EXPENSE' ? 'active' : ''}
                >
                    Expense
                </button>
                <button
                    type="button"
                    onClick={() => setType('REVENUE')}
                    className={type === 'REVENUE' ? 'active' : ''}
                >
                    Revenue
                </button>
            </div>
            <button type="submit">Add Category</button>
        </form>
    );
};

export default CategoryForm;
