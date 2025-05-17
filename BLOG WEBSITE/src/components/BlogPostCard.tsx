import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Clock, MessageSquare, Calendar } from 'lucide-react';
import { Post } from '../types';

interface BlogPostCardProps {
  post: Post;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  const { id, title, excerpt, coverImage, createdAt, readTime, comments, author, category } = post;
  
  // Format date
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Count comments
  const commentCount = comments?.length || 0;
  
  // Placeholder image if none provided
  const image = coverImage || 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="relative h-[400px] w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          {category && (
            <Link 
              to={`/category/${category.slug}`}
              className="absolute top-4 left-4 rounded-full bg-teal-600 px-3 py-1 text-xs font-medium text-white hover:bg-teal-700"
            >
              {category.name}
            </Link>
          )}
        </div>
        
        <div className="absolute bottom-0 w-full p-6 text-white">
          <Link to={`/post/${id}`}>
            <h2 className="mb-3 text-3xl font-serif font-bold leading-tight transition-colors group-hover:text-teal-400">
              {title}
            </h2>
          </Link>
          
          <p className="mb-4 line-clamp-2">{excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {author?.avatar ? (
                <img 
                  src={author.avatar} 
                  alt={author.name}
                  className="mr-2 h-8 w-8 rounded-full object-cover" 
                />
              ) : (
                <div className="mr-2 h-8 w-8 rounded-full bg-gray-600"></div>
              )}
              <span className="text-sm">{author?.name || 'Anonymous'}</span>
            </div>
            
            <div className="flex items-center space-x-4 text-xs opacity-75">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                {readTime || 5} min read
              </div>
              <div className="flex items-center">
                <MessageSquare size={14} className="mr-1" />
                {commentCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <Link 
            to={`/category/${category.slug}`}
            className="absolute top-4 left-4 rounded-full bg-teal-600 px-3 py-1 text-xs font-medium text-white hover:bg-teal-700"
          >
            {category.name}
          </Link>
        )}
      </div>
      
      <div className="flex-1 p-5">
        <Link to={`/post/${id}`}>
          <h3 className="mb-2 text-xl font-serif font-bold leading-tight text-gray-900 transition-colors group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
            {title}
          </h3>
        </Link>
        
        <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">{excerpt}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            {author?.avatar ? (
              <img 
                src={author.avatar} 
                alt={author.name}
                className="mr-2 h-6 w-6 rounded-full object-cover" 
              />
            ) : (
              <div className="mr-2 h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            )}
            <span className="text-xs text-gray-600 dark:text-gray-400">{author?.name || 'Anonymous'}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;