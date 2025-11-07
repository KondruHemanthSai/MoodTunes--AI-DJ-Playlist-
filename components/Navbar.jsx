import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, User, LogOut, Home, BarChart3 } from 'lucide-react';

const Navbar = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
            >
              <Music className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-2xl font-bold text-white">
              Mood<span className="text-green-400">Tunes</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300"
            >
              <Home className="w-4 h-4" />
              <span>Generate</span>
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Library</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white">{user.username}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogin}
                className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full transition-all duration-300"
              >
                Log in
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;