
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleAdminAccess = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/admin-login');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 orange-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-black">RealRate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link to="/properties" className="text-black hover:text-orange-500 transition-colors">
              Properties
            </Link>
            <Link to="/predict-price" className="text-black hover:text-orange-500 transition-colors">
              Price Prediction
            </Link>
            <Link to="/about" className="text-black hover:text-orange-500 transition-colors">
              About
            </Link>
            <button
              onClick={handleAdminAccess}
              className="text-black hover:text-orange-500 transition-colors"
            >
              Admin
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-black">{user.firstName}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="orange-gradient hover:orange-gradient-hover text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black hover:text-orange-500"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-black hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="block px-3 py-2 text-black hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/predict-price"
                className="block px-3 py-2 text-black hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Price Prediction
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-black hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <button
                onClick={handleAdminAccess}
                className="block w-full text-left px-3 py-2 text-black hover:text-orange-500 transition-colors"
              >
                Admin
              </button>
              
              {user ? (
                <div className="border-t border-gray-200 pt-2">
                  <div className="px-3 py-2 text-sm text-black">
                    Logged in as {user.firstName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-orange-500 hover:text-orange-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-2 space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-orange-500 hover:text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-orange-500 hover:text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
