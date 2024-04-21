import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, type }) => {
    if (categories.length === 0) {
        return <p>No {type.toLowerCase()} categories found. Please add some!</p>;
    }

    return (
        <ul>
            {categories.map(category => (
                <CategoryItem
                    key={category.id}
                    category={category}
                />
            ))}
        </ul>
    );
};

export default CategoryList;
