
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 blue-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-blue-500">RealRate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-blue-500 transition-colors">
              Properties
            </Link>
            <Link to="/predict" className="text-gray-700 hover:text-blue-500 transition-colors">
              Predict Price
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
              About
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-500 transition-colors flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="blue-gradient hover:blue-gradient-hover text-white px-4 py-2 rounded-xl transition-all"
                >
                  Sign Up
                </Link>
                <Link
                  to="/admin-login"
                  className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl transition-all flex items-center"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/properties" 
                className="text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link 
                to="/predict" 
                className="text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Predict Price
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-gray-700 hover:text-blue-500 transition-colors flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 mb-3">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-blue-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block blue-gradient hover:blue-gradient-hover text-white px-4 py-2 rounded-xl transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/admin-login"
                    className="block bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl transition-all text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4 mr-1 inline" />
                    Admin Login
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
