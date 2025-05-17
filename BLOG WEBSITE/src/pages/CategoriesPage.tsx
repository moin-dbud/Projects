import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getPostsByCategory } from '../utils/storage';
import { Category } from '../types';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const allCategories = getCategories();
    setCategories(allCategories);
    
    // Update document title
    document.title = 'Categories | InsightBlog';
  }, []);

  return (
    <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore our content by topic
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => {
            const postCount = getPostsByCategory(category.id).length;
            
            return (
              <Link 
                key={category.id}
                to={`/category/${category.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {postCount} {postCount === 1 ? 'post' : 'posts'}
                    </span>
                    <span className="text-teal-600 dark:text-teal-400 font-medium">
                      View Posts →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;