import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, Users, ChevronUp, ChevronDown } from 'lucide-react';
import AdminNav from '../../components/AdminNav';
import { getPosts, getComments, getUsers, getPendingComments } from '../../utils/storage';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    totalUsers: 0,
    recentPosts: [] as any[]
  });

  useEffect(() => {
    // Fetch stats
    const allPosts = getPosts();
    const publishedPosts = allPosts.filter(post => post.isPublished);
    const draftPosts = allPosts.filter(post => !post.isPublished);
    const allComments = getComments();
    const pendingComments = getPendingComments();
    const allUsers = getUsers();
    
    // Recent posts (last 5, sorted by creation date)
    const recentPosts = [...allPosts]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    setStats({
      totalPosts: allPosts.length,
      publishedPosts: publishedPosts.length,
      draftPosts: draftPosts.length,
      totalComments: allComments.length,
      pendingComments: pendingComments.length,
      totalUsers: allUsers.length,
      recentPosts
    });
  }, []);

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
            <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Posts Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Posts</h3>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalPosts}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {stats.publishedPosts} published, {stats.draftPosts} drafts
                  </span>
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <ChevronUp size={16} className="mr-1" />
                    12%
                  </span>
                </div>
              </div>
              
              {/* Comments Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Comments</h3>
                  <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-full">
                    <MessageSquare size={20} className="text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalComments}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {stats.pendingComments} pending approval
                  </span>
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <ChevronUp size={16} className="mr-1" />
                    8%
                  </span>
                </div>
              </div>
              
              {/* Users Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Users</h3>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                    <Users size={20} className="text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalUsers}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    1 admin, {stats.totalUsers - 1} users
                  </span>
                  <span className="flex items-center text-red-600 dark:text-red-400">
                    <ChevronDown size={16} className="mr-1" />
                    3%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Recent Posts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Posts</h3>
                <Link 
                  to="/admin/posts" 
                  className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
                >
                  View All
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {stats.recentPosts.length > 0 ? (
                      stats.recentPosts.map((post, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {post.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {post.isPublished ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link 
                              to={`/admin/posts/edit/${post.id}`} 
                              className="text-teal-600 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 mr-4"
                            >
                              Edit
                            </Link>
                            <Link 
                              to={`/post/${post.id}`} 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          No posts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/admin/posts/new"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <FileText size={24} className="text-teal-600 dark:text-teal-400 mx-auto mb-3" />
                <h3 className="font-medium text-gray-800 dark:text-white mb-1">Create New Post</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Write a new blog post</p>
              </Link>
              
              <Link 
                to="/admin/comments"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <MessageSquare size={24} className="text-teal-600 dark:text-teal-400 mx-auto mb-3" />
                <h3 className="font-medium text-gray-800 dark:text-white mb-1">Moderate Comments</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Review and approve comments</p>
              </Link>
              
              <Link 
                to="/admin/settings"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <Users size={24} className="text-teal-600 dark:text-teal-400 mx-auto mb-3" />
                <h3 className="font-medium text-gray-800 dark:text-white mb-1">Manage Users</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">View and manage user accounts</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;