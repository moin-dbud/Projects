import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPostList from './pages/admin/AdminPostList';
import AdminCreatePost from './pages/admin/AdminCreatePost';
import AdminEditPost from './pages/admin/AdminEditPost';
import AdminComments from './pages/admin/AdminComments';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { initializeData } from './utils/storage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Admin route component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// App container
const AppContainer: React.FC = () => {
  // Initialize data
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen dark:bg-gray-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/post/slug/:slug" element={<PostPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <div>Profile Page</div>
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/posts" element={
                <AdminRoute>
                  <AdminPostList />
                </AdminRoute>
              } />
              <Route path="/admin/posts/new" element={
                <AdminRoute>
                  <AdminCreatePost />
                </AdminRoute>
              } />
              <Route path="/admin/posts/edit/:id" element={
                <AdminRoute>
                  <AdminEditPost />
                </AdminRoute>
              } />
              <Route path="/admin/comments" element={
                <AdminRoute>
                  <AdminComments />
                </AdminRoute>
              } />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

function App() {
  return <AppContainer />;
}

export default App;