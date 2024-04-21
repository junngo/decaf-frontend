import React, { useState } from 'react';

const CategoryItem = ({ category, onUpdateCategory, onDeleteCategory }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(category.name);
    const [editedType, setEditedType] = useState(category.type);

    const handleUpdate = () => {
        onUpdateCategory(category.id, { name: editedName, type: editedType });
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <select value={editedType} onChange={(e) => setEditedType(e.target.value)}>
                        <option value="EXPENSE">Expense</option>
                        <option value="REVENUE">Revenue</option>
                    </select>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    {category.name} ({category.type})
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onDeleteCategory(category.id)}>Delete</button>
                </>
            )}
        </li>
    );
};

export default CategoryItem;
