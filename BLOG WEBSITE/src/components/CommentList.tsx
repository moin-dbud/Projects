import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Comment } from '../types';
import { getUserById } from '../utils/storage';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  // If no comments, show message
  if (comments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Comments</h3>
        <p className="text-gray-600 dark:text-gray-400">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Comments ({comments.length})</h3>
      
      <div className="space-y-6">
        {comments.map((comment) => {
          // Get author details if not already included
          const author = comment.author || getUserById(comment.userId);
          const formattedDate = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
          
          return (
            <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-start">
                <div className="mr-4">
                  {author?.avatar ? (
                    <img 
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                      {author?.name.charAt(0) || 'A'}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {author?.name || 'Anonymous'}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formattedDate}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;