import React from 'react';
import AdminNav from '../../components/AdminNav';
import AdminPostForm from '../../components/AdminPostForm';
import { useAuth } from '../../contexts/AuthContext';

const AdminCreatePost: React.FC = () => {
  const { isAdmin } = useAuth();
  
  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdminNav />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Create New Post</h1>
            <AdminPostForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreatePost;