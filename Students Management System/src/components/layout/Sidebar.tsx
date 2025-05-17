import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  BookOpen, 
  Calendar, 
  Settings, 
  Users, 
  MessageSquare, 
  FileText,
  LogOut,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  
  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart2 size={20} />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      name: 'Students',
      path: '/students',
      icon: <Users size={20} />,
      roles: ['admin', 'teacher'],
    },
    {
      name: 'Teachers',
      path: '/teachers',
      icon: <Users size={20} />,
      roles: ['admin'],
    },
    {
      name: 'Classes',
      path: '/classes',
      icon: <BookOpen size={20} />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: <Calendar size={20} />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      name: 'Grades',
      path: '/grades',
      icon: <FileText size={20} />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      name: 'Messages',
      path: '/messages',
      icon: <MessageSquare size={20} />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      roles: ['admin', 'teacher', 'student', 'parent'],
    },
  ];

  // Only show nav items relevant to the user's role
  const filteredNavItems = navItems.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <button
            className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-800">EduManage</h1>
            <p className="text-sm text-gray-600">Student Management System</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {filteredNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-800 ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-800 border-r-4 border-blue-800'
                        : ''
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};