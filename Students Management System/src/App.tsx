import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { Dashboard } from './pages/Dashboard';
import { StudentsPage } from './pages/StudentsPage';
import { AttendancePage } from './pages/AttendancePage';
import { GradesPage } from './pages/GradesPage';
import { MessagesPage } from './pages/MessagesPage';
import { useAuthStore } from './store/authStore';

// Protected route wrapper component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { user, getUser, isLoading } = useAuthStore();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (isLoading) {
    // You could use a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    );
  }

  return user ? <>{element}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/students" element={<ProtectedRoute element={<StudentsPage />} />} />
        <Route path="/attendance" element={<ProtectedRoute element={<AttendancePage />} />} />
        <Route path="/grades" element={<ProtectedRoute element={<GradesPage />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<MessagesPage />} />} />

        {/* Redirect to login if no match */}
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;