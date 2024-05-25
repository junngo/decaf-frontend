import React from 'react';
import CategoryItem from './CategoryItem';
import "../../styles/components/category/CategoryList.scss";

const CategoryList = ({ categories, type, onUpdateCategory, onDeleteCategory }) => {
    return (
        <ul className="category-list">
        {categories.length === 0 ? (
            <p className="empty-message">No {type.toLowerCase()} categories found. Please add some!</p>
        ) : (
            categories.map(category => (
                <CategoryItem
                    key={category.id}
                    category={category}
                    type={type}
                    onUpdateCategory={onUpdateCategory}
                    onDeleteCategory={onDeleteCategory}
                />
            ))
        )}
    </ul>
    )
};

export default CategoryList;
