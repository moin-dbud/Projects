export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  isApproved: boolean;
  author?: User;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  categoryId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  isPublished: boolean;
  readTime?: number;
  comments?: Comment[];
  author?: User;
  category?: Category;
  tags?: string[];
}