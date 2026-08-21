import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search, CalendarCheck } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef(null);
  
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/', { replace: true });
      await logout();
      toast.success('Successfully logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out.');
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Conditions', path: '/conditions' },
    { name: 'Treatments', path: '/treatments' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Team', path: '/our-team' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-primary font-semibold' : 'text-text-secondary hover:text-primary'
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm py-3' : 'bg-surface py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <img 
              src="/logo.png" 
              alt="Dermat Clinic Logo" 
              className={`block dark:hidden w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'
              }`} 
            />
            <img 
              src="/logo-dark.png" 
              alt="Dermat Clinic Logo Dark" 
              className={`hidden dark:block w-auto object-contain transition-all duration-300 ${
                isScrolled ? 'h-10 sm:h-12' : 'h-12 sm:h-16'
              }`} 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={getNavLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button to="/appointment" variant="primary" size="sm">
              Book Appointment
            </Button>

            <ThemeToggle />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden ml-2 transition-transform hover:scale-105"
                  aria-label="User Profile Menu"
                >
                  {user.photoURL && !imageError ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={() => setImageError(true)} />
                  ) : (
                    <span className="leading-none mt-0.5">
                      {user.displayName?.trim() ? user.displayName.trim().charAt(0).toUpperCase() : user.email?.trim().charAt(0).toUpperCase() || '?'}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-48 bg-surface border border-border rounded-xl shadow-lg py-2 z-50 overflow-hidden origin-top-right"
                    >
                      <div className="px-4 py-2 border-b border-border mb-1">
                        <p className="text-xs text-text-secondary truncate">Signed in as</p>
                        <p className="text-sm font-semibold text-text-primary truncate">{user.displayName || user.email}</p>
                      </div>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-secondary/10 hover:text-primary transition-colors">
                        Update Profile
                      </Link>
                      <Link to="/manage-appointment" className="block px-4 py-2 text-sm text-text-primary hover:bg-secondary/10 hover:text-primary transition-colors">
                        Manage Appointment
                      </Link>
                      <button 
                        onClick={() => { setIsProfileDropdownOpen(false); handleLogout(); }}
                        className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors mt-1 border-t border-border"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary/20 ml-1"
                aria-label="Patient Login"
                title="Patient Login"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-primary focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface border-t border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 shadow-lg">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-gray-50 hover:text-primary dark:hover:bg-gray-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              {user ? (
                <>
                  <div className="pt-4 pb-2 border-t border-border mt-4">
                    <div className="px-3 py-2">
                      <p className="text-xs text-text-secondary">Signed in as</p>
                      <p className="text-sm font-semibold text-text-primary truncate">{user.displayName || user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 text-base font-medium text-text-secondary hover:text-primary"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Update Profile
                    </Link>
                    <Link
                      to="/manage-appointment"
                      className="flex items-center px-3 py-2 text-base font-medium text-text-secondary hover:text-primary"
                    >
                      <CalendarCheck className="w-5 h-5 mr-3" />
                      Manage Appointment
                    </Link>
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                      className="w-full flex items-center px-3 py-2 text-base font-medium text-error hover:text-error/80 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 pb-2 border-t border-border mt-4">
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 text-base font-medium text-text-secondary hover:text-primary"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Patient Login
                  </Link>
                </div>
              )}

              <div className="px-3 pt-4">
                <Button to="/appointment" fullWidth>
                  Book Appointment
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
