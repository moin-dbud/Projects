import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { saveComment } from '../utils/storage';
import { Comment } from '../types';

interface CommentFormProps {
  postId: string;
  onCommentSubmit: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage({
        text: 'Please log in to comment.',
        type: 'error'
      });
      return;
    }

    if (!content.trim()) {
      setMessage({
        text: 'Comment cannot be empty.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newComment: Comment = {
        id: '', // Will be set in saveComment
        postId,
        userId: user.id,
        content,
        createdAt: new Date(),
        isApproved: false,
        author: user
      };
      
      saveComment(newComment);
      
      setContent('');
      setMessage({
        text: 'Your comment has been submitted and is awaiting approval.',
        type: 'success'
      });
      
      onCommentSubmit();
    } catch (error) {
      setMessage({
        text: 'Failed to submit comment. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Leave a Comment</h3>
      
      {!user && (
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-md mb-4">
          Please <a href="/login" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">log in</a> to leave a comment.
        </div>
      )}
      
      {message && (
        <div className={`${
          message.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
        } p-4 rounded-md mb-4`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!user || isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder={user ? "Share your thoughts..." : "Log in to comment"}
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!user || isSubmitting}
            className={`px-4 py-2 rounded-md ${
              !user 
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                : 'bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
            } transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </div>
      </form>
      
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Comments will be reviewed before appearing on the site.
      </p>
    </div>
  );
};

export default CommentForm;