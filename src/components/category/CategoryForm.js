import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                placeholder="Category Name"
                onChange={(e) => setName(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="EXPENSE">Expense</option>
                <option value="REVENUE">Revenue</option>
            </select>
            <button type="submit">Add Category</button>
        </form>
    );
};

export default CategoryForm;
