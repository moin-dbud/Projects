import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Insight<span className="text-teal-400">Blog</span></h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Delivering thoughtful insights and perspectives on technology, lifestyle, and education to help you navigate our complex world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-teal-400 transition-colors">Categories</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/technology" className="text-gray-400 hover:text-teal-400 transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/category/lifestyle" className="text-gray-400 hover:text-teal-400 transition-colors">Lifestyle</Link>
              </li>
              <li>
                <Link to="/category/education" className="text-gray-400 hover:text-teal-400 transition-colors">Education</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest blog posts and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-300"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition flex items-center justify-center"
              >
                <Mail size={16} className="mr-2" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © {currentYear} InsightBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;