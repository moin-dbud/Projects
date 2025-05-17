import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Award, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About Us | InsightBlog';
  }, []);

  return (
    <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            About InsightBlog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            We're passionate about sharing knowledge and insights on technology, lifestyle, and education. 
            Our mission is to create a platform where ideas flourish and conversations matter.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-400">Monthly Readers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Published Articles</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-400">Expert Contributors</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Users className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community Driven</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built by and for a community of passionate readers and writers.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <BookOpen className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quality Content</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Carefully curated articles that inform, inspire, and engage.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Award className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Expert Writers</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Articles written by industry experts and thought leaders.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Mail className="w-12 h-12 text-teal-600 dark:text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Regular newsletters and updates on latest trends.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-xl text-white/90 mb-6">
            Be part of our growing community of readers and writers.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;