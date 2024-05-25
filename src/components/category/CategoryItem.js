import React, { useState } from 'react';
import "../../styles/components/category/CategoryItem.scss";

const CategoryItem = ({ category, type, onUpdateCategory, onDeleteCategory }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(category.name);
    const [editedType, setEditedType] = useState(category.type);

    const handleUpdate = () => {
        onUpdateCategory(category.id, { name: editedName, type: editedType });
        setIsEditing(false);
    };

    return (
            <li className={`category-item ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
                <div className="category-edit-form">
                    <input
                        className="category-input"
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <select className="category-select" value={editedType} onChange={(e) => setEditedType(e.target.value)}>
                        <option value="EXPENSE">Expense</option>
                        <option value="REVENUE">Revenue</option>
                    </select>
                    <button className="save-button" onClick={handleUpdate}>Save</button>
                    <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <div className="category-details">
                        <span className="category-name">{category.name}</span>
                    </div>
                    <div className="category-actions">
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete-button" onClick={() => onDeleteCategory(category.id, category.type)}>Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default CategoryItem;
