import React from 'react';

const CategoryTabs = ({ categories, activeCategory, onSelect }) => (
  <aside className="category-tabs">
    {categories.map((category) => (
      <button
        type="button"
        key={category.id}
        className={category.id === activeCategory ? 'tab active' : 'tab'}
        onClick={() => onSelect(category.id)}
      >
        {category.label}
      </button>
    ))}
  </aside>
);

export default CategoryTabs;
