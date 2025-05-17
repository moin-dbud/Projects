import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Calendar, Edit, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getPostBySlug, getPostById, getCommentsByPost, getCategoryById, getUserById } from '../utils/storage';
import { Post, Comment } from '../types';
import { useAuth } from '../contexts/AuthContext';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import CategoryList from '../components/CategoryList';

const PostPage: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Fetch post by id or slug
    let foundPost: Post | undefined;
    
    if (id) {
      foundPost = getPostById(id);
    } else if (slug) {
      foundPost = getPostBySlug(slug);
    }
    
    if (foundPost) {
      // Enhance post with author and category info
      const enhancedPost = {
        ...foundPost,
        author: foundPost.author || getUserById(foundPost.authorId),
        category: foundPost.category || getCategoryById(foundPost.categoryId)
      };
      
      setPost(enhancedPost);
      
      // Update document title
      document.title = `${enhancedPost.title} | InsightBlog`;
      
      // Load comments
      loadComments(enhancedPost.id);
    }
  }, [id, slug]);

  // Load comments
  const loadComments = (postId: string) => {
    setLoadingComments(true);
    
    try {
      const postComments = getCommentsByPost(postId).map(comment => ({
        ...comment,
        author: getUserById(comment.userId)
      }));
      
      setComments(postComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (post) {
      loadComments(post.id);
    }
  };

  // Toggle share dropdown
  const toggleShare = () => {
    setShareOpen(!shareOpen);
  };

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Post not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The post you're looking for doesn't exist or has been removed.
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

  const { title, content, createdAt, updatedAt, readTime, tags, author, category } = post;
  
  // Format dates
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const formattedUpdateDate = updatedAt 
    ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true })
    : null;
  
  // Current URL for sharing
  const currentUrl = window.location.href;

  return (
    <div className="pt-24 lg:pt-28 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Category */}
          {category && (
            <Link 
              to={`/category/${category.slug}`}
              className="inline-block mb-6 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 text-sm font-medium rounded-full"
            >
              {category.name}
            </Link>
          )}
          
          {/* Post Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight text-gray-900 dark:text-white mb-6">
            {title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-8 gap-y-2">
            {/* Author */}
            <div className="flex items-center mr-6">
              {author?.avatar ? (
                <img 
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 mr-2"></div>
              )}
              <span>{author?.name || 'Anonymous'}</span>
            </div>
            
            {/* Date */}
            <div className="flex items-center mr-6">
              <Calendar size={16} className="mr-1" />
              <span>{formattedDate}</span>
            </div>
            
            {/* Read Time */}
            <div className="flex items-center mr-6">
              <Clock size={16} className="mr-1" />
              <span>{readTime || 5} min read</span>
            </div>
            
            {/* Admin Edit Link */}
            {isAdmin && (
              <Link 
                to={`/admin/posts/edit/${post.id}`}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline ml-auto"
              >
                <Edit size={16} className="mr-1" />
                Edit Post
              </Link>
            )}
          </div>
          
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-10 rounded-xl overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10 text-gray-800 dark:text-gray-300">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Tags and Social Sharing */}
          <div className="flex flex-wrap items-center justify-between py-6 border-t border-b border-gray-200 dark:border-gray-800 mb-10">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-0">
              <Tag size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/tag/${tag}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {tag}
                  </Link>
                ))
              ) : (
                <span className="text-gray-500 dark:text-gray-400">No tags</span>
              )}
            </div>
            
            {/* Social Sharing */}
            <div className="relative">
              <button
                onClick={toggleShare}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
              >
                <Share2 size={18} className="mr-2" />
                Share
              </button>
              
              {shareOpen && (
                <div className="absolute right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-md shadow-md z-10 flex space-x-4">
                  <a 
                    href={`https://facebook.com/sharer/sharer.php?u=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600 dark:text-blue-300"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mb-10">
            <CommentForm 
              postId={post.id} 
              onCommentSubmit={handleCommentSubmit} 
            />
            
            {loadingComments ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
              </div>
            ) : (
              <CommentList comments={comments} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;