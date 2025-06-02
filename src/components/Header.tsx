
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 wine-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className={`text-xl font-bold transition-opacity duration-300 ${isScrolled ? 'opacity-0 md:opacity-100' : 'opacity-100'}`} style={{ color: '#5a1e24' }}>
              RealRate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
            <Link to="/" className="text-gray-700 hover:text-[#5a1e24] transition-colors">
              Home
            </Link>
            <Link to="/predict" className="text-gray-700 hover:text-[#5a1e24] transition-colors">
              Predict Price
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-[#5a1e24] transition-colors">
              Properties
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#5a1e24] transition-colors">
              About
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-[#5a1e24] text-[#5a1e24] hover:bg-[#5a1e24] hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-[#5a1e24] hover:underline transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/predict"
                  className="wine-gradient text-white px-6 py-2 rounded-lg hover:wine-gradient-hover transition-all transform hover:scale-105"
                >
                  Get Price Estimate
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-[#5a1e24] transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/predict"
                className="text-gray-700 hover:text-[#5a1e24] transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Predict Price
              </Link>
              <Link
                to="/properties"
                className="text-gray-700 hover:text-[#5a1e24] transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-[#5a1e24] transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {isAuthenticated ? (
                <div className="px-4 py-2 space-y-2">
                  <p className="text-sm text-gray-600">Welcome, {user?.firstName}</p>
                  <Button
                    onClick={handleLogout}
                    className="w-full wine-gradient hover:wine-gradient-hover text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="px-4 space-y-2">
                  <Link
                    to="/login"
                    className="block text-center py-2 text-[#5a1e24] hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/predict"
                    className="block text-center wine-gradient text-white px-6 py-2 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Price Estimate
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
