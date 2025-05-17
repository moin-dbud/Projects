import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';
import AdminPostForm from '../../components/AdminPostForm';
import { getPostById } from '../../utils/storage';
import { Post } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const AdminEditPost: React.FC = () => {
  const { isAdmin } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Post ID is required');
      setLoading(false);
      return;
    }

    try {
      const foundPost = getPostById(id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      setError('Error loading post');
    } finally {
      setLoading(false);
    }
  }, [id]);

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
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Edit Post</h1>
            
            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={() => navigate('/admin/posts')}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Back to Posts
                </button>
              </div>
            ) : (
              <AdminPostForm post={post || undefined} isEdit={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditPost;