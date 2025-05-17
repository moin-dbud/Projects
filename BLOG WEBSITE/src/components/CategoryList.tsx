import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../types';

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Categories</h3>
      
      <div className="space-y-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.slug}`}
            className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {/* In a real app, we would count posts per category */}
              {Math.floor(Math.random() * 10) + 1}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;