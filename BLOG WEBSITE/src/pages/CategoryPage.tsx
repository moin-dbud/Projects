import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';
import { getCategories, getPostsByCategory } from '../utils/storage';
import { Post, Category } from '../types';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const categories = getCategories();
    const foundCategory = categories.find(c => c.slug === slug);
    
    if (foundCategory) {
      setCategory(foundCategory);
      const categoryPosts = getPostsByCategory(foundCategory.id);
      setPosts(categoryPosts);
      
      // Update document title
      document.title = `${foundCategory.name} | InsightBlog`;
    }
  }, [slug]);

  if (!category) {
    return (
      <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link 
            to="/categories" 
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          )}
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No posts found in this category.
            </p>
            <Link 
              to="/" 
              className="text-teal-600 dark:text-teal-400 hover:underline"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;