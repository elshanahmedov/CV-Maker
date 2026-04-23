import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-blue-900 bg-opacity-60 shadow-lg backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FileText className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">
              CWIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-200 bg-blue-800'
                    : 'text-white hover:text-blue-200 hover:bg-blue-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login and Profile */}
          <div className="hidden items-center space-x-4 md:flex">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center p-2 space-x-2 text-white bg-blue-800 rounded-full transition-colors hover:bg-blue-700"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 z-50 py-1 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 space-x-2 w-full text-sm text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-white transition-colors hover:text-blue-200"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all hover:from-blue-700 hover:to-purple-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white rounded-md transition-colors hover:text-blue-200 hover:bg-blue-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="py-4 border-t border-blue-800 md:hidden">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-200 bg-blue-800'
                      : 'text-white hover:text-blue-200 hover:bg-blue-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-blue-800">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-white">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-blue-200">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center px-3 py-2 space-x-2 w-full text-base font-medium text-left text-white rounded-md transition-colors hover:text-blue-200 hover:bg-blue-800"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-3 py-2 space-x-2 text-base font-medium text-white rounded-md transition-colors hover:text-blue-200 hover:bg-blue-800"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;