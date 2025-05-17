import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Eye, Search, Filter } from 'lucide-react';
import AdminNav from '../../components/AdminNav';
import { getComments, approveComment, deleteComment, getPostById, getUserById } from '../../utils/storage';
import { Comment } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const AdminComments: React.FC = () => {
  const { isAdmin } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirming, setConfirming] = useState<string | null>(null);

  useEffect(() => {
    // Fetch comments
    const allComments = getComments().map(comment => {
      const post = getPostById(comment.postId);
      const user = getUserById(comment.userId);
      return {
        ...comment,
        post,
        author: user
      };
    });
    
    // Sort by date (newest first)
    const sortedComments = allComments.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setComments(sortedComments);
    setFilteredComments(sortedComments);
  }, []);

  // Apply filters when search query or status filter changes
  useEffect(() => {
    let filtered = [...comments];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        comment => 
          comment.content.toLowerCase().includes(query) || 
          comment.author?.name.toLowerCase().includes(query) ||
          comment.post?.title.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const isApproved = statusFilter === 'approved';
      filtered = filtered.filter(comment => comment.isApproved === isApproved);
    }
    
    setFilteredComments(filtered);
  }, [searchQuery, statusFilter, comments]);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // Approve comment
  const handleApprove = (commentId: string) => {
    try {
      approveComment(commentId);
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, isApproved: true } 
          : comment
      ));
      setConfirming(null);
    } catch (error) {
      console.error('Error approving comment:', error);
      alert('Failed to approve comment');
    }
  };

  // Delete comment
  const handleDelete = (commentId: string) => {
    try {
      deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
      setConfirming(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  // If not admin, redirect or show error
  if (!isAdmin) {
    return (
      <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You do not have permission to view this page.
          </p>
          <Link 
            to="/" 
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Back to Home
          </Link>
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
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Manage Comments
            </h1>
            
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Search comments..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                {/* Status Filter */}
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Comments</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Comments Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Comment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Post
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredComments.length > 0 ? (
                      filteredComments.map((comment) => (
                        <tr key={comment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {comment.author?.avatar ? (
                                <img 
                                  src={comment.author.avatar}
                                  alt={comment.author.name}
                                  className="h-8 w-8 rounded-full mr-3"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-3"></div>
                              )}
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {comment.author?.name || 'Anonymous'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 max-w-xs break-words">
                              {comment.content.length > 100 
                                ? `${comment.content.substring(0, 100)}...` 
                                : comment.content}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link 
                              to={`/post/${comment.postId}`}
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {comment.post?.title || 'Unknown Post'}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {comment.isApproved ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                Approved
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-3">
                              <Link 
                                to={`/post/${comment.postId}`}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                                title="View Post"
                              >
                                <Eye size={18} />
                              </Link>
                              
                              {!comment.isApproved && (
                                <button 
                                  onClick={() => handleApprove(comment.id)}
                                  className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                                  title="Approve Comment"
                                >
                                  <Check size={18} />
                                </button>
                              )}
                              
                              <button 
                                onClick={() => setConfirming(comment.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                title="Delete Comment"
                              >
                                <X size={18} />
                              </button>
                            </div>
                            
                            {/* Delete Confirmation */}
                            {confirming === comment.id && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Confirm Delete
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Are you sure you want to delete this comment? This action cannot be undone.
                                  </p>
                                  <div className="flex justify-end space-x-3">
                                    <button 
                                      onClick={() => setConfirming(null)}
                                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                      Cancel
                                    </button>
                                    <button 
                                      onClick={() => handleDelete(comment.id)}
                                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                          No comments found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComments;