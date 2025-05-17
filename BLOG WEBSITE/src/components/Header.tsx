import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const location = useLocation();

  // Toggle menu for mobile
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode ? 'true' : 'false');
  };

  // Check if path is active
  const isActive = (path: string) => location.pathname === path;

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check stored dark mode preference on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(storedDarkMode);
    document.documentElement.classList.toggle('dark', storedDarkMode);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold text-blue-900 dark:text-white"
          >
            Insight<span className="text-teal-600">Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition ${
                isActive('/') 
                  ? 'text-teal-600 dark:text-teal-400' 
                  : 'text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400'
              }`}
            >
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button 
                className={`flex items-center font-medium transition ${
                  location.pathname.includes('/category') 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400'
                }`}
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                Categories <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="absolute mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20">
                  <Link 
                    to="/category/technology" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Technology
                  </Link>
                  <Link 
                    to="/category/lifestyle" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Lifestyle
                  </Link>
                  <Link 
                    to="/category/education" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    Education
                  </Link>
                  <Link 
                    to="/categories" 
                    className="block px-4 py-2 text-teal-600 dark:text-teal-400 font-medium"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/about" 
              className={`font-medium transition ${
                isActive('/about') 
                  ? 'text-teal-600 dark:text-teal-400' 
                  : 'text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400'
              }`}
            >
              About
            </Link>
            
            <Link 
              to="/contact" 
              className={`font-medium transition ${
                isActive('/contact') 
                  ? 'text-teal-600 dark:text-teal-400' 
                  : 'text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Side: Auth & Theme */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-sm font-medium px-4 py-2 rounded-md border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white transition dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-800"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={logout}
                  className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm font-medium px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition dark:bg-teal-700 dark:hover:bg-teal-600"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-20">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className={`text-xl font-medium ${
                  isActive('/') 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className={`text-xl font-medium ${
                  isActive('/categories') 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className={`text-xl font-medium ${
                  isActive('/about') 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`text-xl font-medium ${
                  isActive('/contact') 
                    ? 'text-teal-600 dark:text-teal-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                Contact
              </Link>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                {user ? (
                  <div className="flex flex-col space-y-4">
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="text-md font-medium py-3 rounded-md bg-blue-50 text-blue-800 text-center dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="text-md font-medium py-3 rounded-md border border-gray-300 text-gray-700 text-center dark:border-gray-700 dark:text-gray-300"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link 
                      to="/login" 
                      className="text-md font-medium py-3 rounded-md border border-gray-300 text-gray-700 text-center dark:border-gray-700 dark:text-gray-300"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="text-md font-medium py-3 rounded-md bg-teal-600 text-white text-center dark:bg-teal-700"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;