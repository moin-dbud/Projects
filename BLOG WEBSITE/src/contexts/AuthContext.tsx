import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authenticateUser, getCurrentUser, logoutUser, saveUser, getUserByEmail } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    try {
      const authenticatedUser = authenticateUser(email, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        return authenticatedUser;
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const register = async (name: string, email: string, password: string): Promise<User | null> => {
    setLoading(true);
    try {
      // Check if user with this email already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        return null;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
        isAdmin: false,
        createdAt: new Date()
      };

      const savedUser = saveUser(newUser);
      
      // Auto-login the user
      const authenticatedUser = authenticateUser(email, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
      }
      
      return savedUser;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAdmin: user?.isAdmin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};