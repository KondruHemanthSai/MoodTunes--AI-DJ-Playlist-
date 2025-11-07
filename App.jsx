import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VideoView from './pages/VideoView';
import LoginModal from './components/LoginModal';
import CursorBackground from './components/CursorBackground'; // 👈 bouncing logo
import Loader from './components/Loader'; // 👈 loader
import BackgroundRain from './components/BackgroundRain'; // 👈 new green rain
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      const savedUser = localStorage.getItem('moodtunes_user');
      const savedPlaylists = localStorage.getItem('moodtunes_playlists');
      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists));
      setLoading(false);
    }, 2000); // 👈 fake delay for loader
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('moodtunes_user', JSON.stringify(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('moodtunes_user');
  };

  const savePlaylist = (playlist) => {
    const newPlaylists = [...playlists, { ...playlist, userId: user?.id, id: Date.now() }];
    setPlaylists(newPlaylists);
    localStorage.setItem('moodtunes_playlists', JSON.stringify(newPlaylists));
  };

  // 👇 Show loader while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
        {/* 👇 Green Rain Background */}
        
         <BackgroundRain /> 
<div className="fixed inset-0 bg-gradient-to-br from-green-900/5 via-black to-gray-900/10 pointer-events-none"></div> 
 <CursorBackground /> 


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Navbar 
            user={user} 
            onLogin={() => setShowLogin(true)} 
            onLogout={handleLogout} 
          />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  user={user} 
                  onSavePlaylist={savePlaylist}
                  onLoginRequired={() => setShowLogin(true)}
                />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  user={user} 
                  playlists={playlists.filter(p => p.userId === user?.id)}
                />
              } 
            />
            <Route path="/video/:songId" element={<VideoView />} />
          </Routes>
          
          {showLogin && (
            <LoginModal 
              onClose={() => setShowLogin(false)}
              onLogin={handleLogin}
            />
          )}
        </motion.div>
      </div>
    </Router>
  );
}

export default App;