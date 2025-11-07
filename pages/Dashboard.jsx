import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Trash2, Calendar, Clock, Search, Plus, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { slideUp, staggerContainer } from '../utils/motion';

const Dashboard = ({ user, playlists }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-gray-900 border border-gray-700 rounded-2xl max-w-md"
        >
          <Music className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Sign in Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to access your music library</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full transition-all duration-300"
          >
            Go to Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(selectedPlaylist?.id === playlist.id ? null : playlist);
  };

  const handleDeletePlaylist = (playlistId) => {
    console.log('Delete playlist:', playlistId);
  };

  const totalSongs = playlists.reduce((total, playlist) => total + (playlist.songs?.length || 0), 0);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={slideUp} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Your Library
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome back, <span className="text-green-400 font-semibold">{user.username}</span>
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={slideUp} className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{playlists.length}</p>
                <p className="text-gray-400 text-sm">Playlists</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalSongs}</p>
                <p className="text-gray-400 text-sm">Total Songs</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Active</p>
                <p className="text-gray-400 text-sm">This Week</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-gray-900 border border-gray-700 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Recent</p>
                <p className="text-gray-400 text-sm">Last Activity</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Actions */}
        <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your playlists..."
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-xl transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Playlist</span>
          </motion.button>
        </motion.div>

        {/* Playlists */}
        <motion.div variants={slideUp}>
          {filteredPlaylists.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {searchTerm ? 'No playlists found' : 'No saved playlists yet'}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {searchTerm ? 'Try adjusting your search terms' : 'Start creating playlists to build your personal music library'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-full transition-all duration-300"
              >
                Create Your First Playlist
              </motion.button>
            </div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredPlaylists.map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div 
                      className="p-6 bg-gray-900 border border-gray-700 rounded-2xl hover:border-green-500/50 transition-all duration-300 cursor-pointer card-hover"
                      onClick={() => handlePlaylistClick(playlist)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                            <Music className="w-8 h-8 text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-white mb-1 truncate group-hover:text-green-400 transition-colors">
                              {playlist.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-2 truncate">{playlist.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{playlist.songs?.length || 0} songs</span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>Created recently</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlaylist(playlist.id);
                          }}
                          className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-full text-red-400 transition-all duration-300 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Expanded Playlist */}
                    <AnimatePresence>
                      {selectedPlaylist?.id === playlist.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 p-4 bg-gray-800/50 border border-gray-600 rounded-xl"
                        >
                          <div className="space-y-2">
                            {playlist.songs?.map((song, songIndex) => (
                              <div key={songIndex} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
                                <div className="flex items-center space-x-3">
                                  <span className="w-6 h-6 bg-green-500 rounded text-black text-xs font-bold flex items-center justify-center">
                                    {songIndex + 1}
                                  </span>
                                  <div>
                                    <p className="text-white font-medium">{song.title}</p>
                                    <p className="text-gray-400 text-sm">{song.artist}</p>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  onClick={() => window.open(song.spotifyUrl, '_blank')}
                                  className="p-2 bg-green-500 hover:bg-green-400 rounded-full text-black transition-all duration-300"
                                >
                                  <Play className="w-4 h-4" />
                                </motion.button>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;