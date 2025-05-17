import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import BlogPostCard from '../components/BlogPostCard';
import CategoryList from '../components/CategoryList';
import { getPosts, getCategories, getCategoryById } from '../utils/storage';
import { Post, Category } from '../types';

const HomePage: React.FC = () => {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Load posts
    const allPosts = getPosts()
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Set featured post (newest)
    if (allPosts.length > 0) {
      setFeaturedPost(allPosts[0]);
    }

    // Set recent posts (excluding featured)
    setRecentPosts(allPosts.slice(1, 7));

    // Load categories
    setCategories(getCategories());

    // Enhance posts with category info
    const enhancedPosts = allPosts.map(post => ({
      ...post,
      category: getCategoryById(post.categoryId)
    }));

    if (enhancedPosts.length > 0) {
      setFeaturedPost(enhancedPosts[0]);
    }
    setRecentPosts(enhancedPosts.slice(1, 7));
  }, []);

  return (
    <div className="pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Insights & Perspectives on Modern Life
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Thoughtful articles on technology, lifestyle, and education 
              to help you navigate our complex world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/categories" 
                className="px-6 py-3 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors"
              >
                Explore Categories
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 rounded-md bg-transparent border border-white hover:bg-white hover:text-blue-900 text-white font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
                Featured Post
              </h2>
            </div>
            <BlogPostCard post={featuredPost} featured={true} />
          </section>
        )}

        {/* Recent Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Recent Posts
            </h2>
            <Link 
              to="/posts" 
              className="flex items-center text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
            >
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No posts available yet.</p>
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8">
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map(category => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold mb-4 text-blue-900 dark:text-blue-400">
                Join Our Newsletter
              </h3>
              <p className="text-blue-800 dark:text-blue-300 mb-6">
                Get the latest posts delivered right to your inbox
              </p>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-md border border-blue-300 dark:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs text-blue-700 dark:text-blue-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;