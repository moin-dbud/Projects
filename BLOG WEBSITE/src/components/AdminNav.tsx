import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, MessageSquare, Users, Settings } from 'lucide-react';

const AdminNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h2>
      
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin"
            className={`flex items-center p-3 rounded-md transition-colors ${
              isActive('/admin') && !isActive('/admin/posts') && !isActive('/admin/categories') && !isActive('/admin/comments') && !isActive('/admin/users')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard size={18} className="mr-3" />
            Overview
          </Link>
        </li>
        <li>
          <Link
            to="/admin/posts"
            className={`flex items-center p-3 rounded-md transition-colors ${
              isActive('/admin/posts')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <FileText size={18} className="mr-3" />
            Posts
          </Link>
        </li>
        <li>
          <Link
            to="/admin/categories"
            className={`flex items-center p-3 rounded-md transition-colors ${
              isActive('/admin/categories')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <FolderOpen size={18} className="mr-3" />
            Categories
          </Link>
        </li>
        <li>
          <Link
            to="/admin/comments"
            className={`flex items-center p-3 rounded-md transition-colors ${
              isActive('/admin/comments')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <MessageSquare size={18} className="mr-3" />
            Comments
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className={`flex items-center p-3 rounded-md transition-colors ${
              isActive('/admin/users')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <Users size={18} className="mr-3" />
            Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/settings"
            className={`flex items-center p-3 rounded-md transition-colors ${
              isActive('/admin/settings')
                ? 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <Settings size={18} className="mr-3" />
            Settings
          </Link>
        </li>
      </ul>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/"
          className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Back to Website
        </Link>
      </div>
    </nav>
  );
};

export default AdminNav;