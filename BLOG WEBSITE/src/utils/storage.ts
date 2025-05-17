import { Post, User, Category, Comment } from '../types';

// Local storage keys
const USERS_KEY = 'blog_users';
const POSTS_KEY = 'blog_posts';
const CATEGORIES_KEY = 'blog_categories';
const COMMENTS_KEY = 'blog_comments';
const AUTH_USER_KEY = 'blog_auth_user';

// Initialize data if not exists
const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    // Create admin user
    const adminUser: User = {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123', // In a real app, this would be hashed
      isAdmin: true,
      createdAt: new Date()
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([adminUser]));
  }

  if (!localStorage.getItem(CATEGORIES_KEY)) {
    const defaultCategories: Category[] = [
      { id: '1', name: 'Technology', slug: 'technology', description: 'Latest tech news and reviews' },
      { id: '2', name: 'Lifestyle', slug: 'lifestyle', description: 'Tips for better living' },
      { id: '3', name: 'Education', slug: 'education', description: 'Learning resources and guides' }
    ];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  }

  if (!localStorage.getItem(POSTS_KEY)) {
    localStorage.setItem(POSTS_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(COMMENTS_KEY)) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify([]));
  }
};

// Users
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): User => {
  const users = getUsers();
  const updatedUsers = [...users, { ...user, id: Date.now().toString() }];
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  return user;
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

// Categories
export const getCategories = (): Category[] => {
  const categories = localStorage.getItem(CATEGORIES_KEY);
  return categories ? JSON.parse(categories) : [];
};

export const getCategoryById = (id: string): Category | undefined => {
  const categories = getCategories();
  return categories.find(category => category.id === id);
};

export const saveCategory = (category: Category): Category => {
  const categories = getCategories();
  const newCategory = { ...category, id: Date.now().toString() };
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify([...categories, newCategory]));
  return newCategory;
};

export const updateCategory = (category: Category): Category => {
  const categories = getCategories();
  const updatedCategories = categories.map(c => 
    c.id === category.id ? category : c
  );
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
  return category;
};

export const deleteCategory = (id: string): void => {
  const categories = getCategories();
  const updatedCategories = categories.filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
};

// Posts
export const getPosts = (): Post[] => {
  const posts = localStorage.getItem(POSTS_KEY);
  return posts ? JSON.parse(posts) : [];
};

export const getPostById = (id: string): Post | undefined => {
  const posts = getPosts();
  return posts.find(post => post.id === id);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  const posts = getPosts();
  return posts.find(post => post.slug === slug);
};

export const getPostsByCategory = (categoryId: string): Post[] => {
  const posts = getPosts();
  return posts.filter(post => post.categoryId === categoryId && post.isPublished);
};

export const savePost = (post: Post): Post => {
  const posts = getPosts();
  const newPost = { 
    ...post, 
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  localStorage.setItem(POSTS_KEY, JSON.stringify([...posts, newPost]));
  return newPost;
};

export const updatePost = (post: Post): Post => {
  const posts = getPosts();
  const updatedPost = { ...post, updatedAt: new Date() };
  const updatedPosts = posts.map(p => 
    p.id === post.id ? updatedPost : p
  );
  localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  return updatedPost;
};

export const deletePost = (id: string): void => {
  const posts = getPosts();
  const updatedPosts = posts.filter(p => p.id !== id);
  localStorage.setItem(POSTS_KEY, JSON.stringify(updatedPosts));
  
  // Also delete all comments for this post
  const comments = getComments();
  const updatedComments = comments.filter(c => c.postId !== id);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
};

// Comments
export const getComments = (): Comment[] => {
  const comments = localStorage.getItem(COMMENTS_KEY);
  return comments ? JSON.parse(comments) : [];
};

export const getCommentsByPost = (postId: string): Comment[] => {
  const comments = getComments();
  return comments.filter(comment => comment.postId === postId && comment.isApproved);
};

export const getPendingComments = (): Comment[] => {
  const comments = getComments();
  return comments.filter(comment => !comment.isApproved);
};

export const saveComment = (comment: Comment): Comment => {
  const comments = getComments();
  const newComment = { 
    ...comment, 
    id: Date.now().toString(),
    createdAt: new Date(),
    isApproved: false // Comments require approval by default
  };
  localStorage.setItem(COMMENTS_KEY, JSON.stringify([...comments, newComment]));
  return newComment;
};

export const approveComment = (id: string): void => {
  const comments = getComments();
  const updatedComments = comments.map(c => 
    c.id === id ? { ...c, isApproved: true } : c
  );
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
};

export const deleteComment = (id: string): void => {
  const comments = getComments();
  const updatedComments = comments.filter(c => c.id !== id);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(updatedComments));
};

// Authentication
export const authenticateUser = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password) { // In a real app, use proper password comparison
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userWithoutPassword));
    return user;
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(AUTH_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem(AUTH_USER_KEY);
};

// Initialize storage with default data
export const initializeData = () => {
  initializeStorage();
};