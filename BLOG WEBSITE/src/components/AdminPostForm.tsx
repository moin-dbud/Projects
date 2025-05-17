import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post, Category } from '../types';
import { getCategories, savePost, updatePost } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';

interface AdminPostFormProps {
  post?: Post;
  isEdit?: boolean;
}

const AdminPostForm: React.FC<AdminPostFormProps> = ({ post, isEdit = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    categoryId: '',
    isPublished: false,
    readTime: 5,
    tags: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load categories
  useEffect(() => {
    const allCategories = getCategories();
    setCategories(allCategories);
    
    // Set default category if available
    if (allCategories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({ ...prev, categoryId: allCategories[0].id }));
    }
  }, []);

  // Populate form with post data if editing
  useEffect(() => {
    if (isEdit && post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        coverImage: post.coverImage || '',
        categoryId: post.categoryId,
        isPublished: post.isPublished,
        readTime: post.readTime || 5,
        tags: post.tags?.join(', ') || '',
      });
    }
  }, [isEdit, post]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when title changes
    if (name === 'title' && !isEdit) {
      const slug = generateSlug(value);
      setFormData(prev => ({ ...prev, title: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!user) {
      alert('You must be logged in to perform this action');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const postData: Post = {
        id: isEdit && post ? post.id : '',
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        coverImage: formData.coverImage.trim() || undefined,
        categoryId: formData.categoryId,
        authorId: user.id,
        createdAt: isEdit && post ? new Date(post.createdAt) : new Date(),
        updatedAt: new Date(),
        publishedAt: formData.isPublished ? new Date() : undefined,
        isPublished: formData.isPublished,
        readTime: Number(formData.readTime) || 5,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };
      
      if (isEdit && post) {
        updatePost(postData);
      } else {
        savePost(postData);
      }
      
      navigate('/admin/posts');
    } catch (error) {
      alert('An error occurred while saving the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Slug*
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.slug ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
          </div>

          {/* Excerpt */}
          <div className="md:col-span-2">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Excerpt*
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              rows={2}
              value={formData.excerpt}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.excerpt && <p className="mt-1 text-sm text-red-500">{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content*
            </label>
            <textarea
              id="content"
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
          </div>

          {/* Cover Image */}
          <div className="md:col-span-2">
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Leave empty to use a default image
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category*
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.categoryId ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>}
          </div>

          {/* Read Time */}
          <div>
            <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Read Time (minutes)
            </label>
            <input
              type="number"
              id="readTime"
              name="readTime"
              min="1"
              max="60"
              value={formData.readTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="technology, coding, web"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Separate tags with commas
            </p>
          </div>

          {/* Published */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Publish post
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/admin/posts')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
};

export default AdminPostForm;