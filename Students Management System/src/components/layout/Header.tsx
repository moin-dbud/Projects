import React from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, title = 'Dashboard' }) => {
  const { user } = useAuthStore();
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const profileRef = React.useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="ml-2 lg:ml-0 text-xl font-medium text-gray-800">{title}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg py-2 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {/* Sample notifications - in a real app, these would be dynamic */}
                    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-800">New announcement posted</p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-medium text-gray-800">Attendance updated</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile dropdown */}
            {user && (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  className="flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="User profile"
                >
                  <Avatar 
                    name={`${user.firstName} ${user.lastName}`} 
                    src={user.profileUrl} 
                    size="sm" 
                  />
                  <span className="ml-2 text-sm hidden md:block">{`${user.firstName} ${user.lastName}`}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-800">{`${user.firstName} ${user.lastName}`}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Your Profile
                    </a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => useAuthStore.getState().logout()}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};