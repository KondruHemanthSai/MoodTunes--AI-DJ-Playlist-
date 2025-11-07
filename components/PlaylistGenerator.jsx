import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings, Loader2 } from 'lucide-react';
import { generatePlaylist } from '../utils/geminiApi';

const PlaylistGenerator = ({ onPlaylistGenerated, user, onLoginRequired }) => {
  const [prompt, setPrompt] = useState('');
  const [songCount, setSongCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe your mood or theme');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const playlist = await generatePlaylist(prompt, songCount);
      onPlaylistGenerated(playlist);
    } catch (err) {
      setError('Failed to generate playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-8 bg-gray-900 rounded-2xl border border-gray-700"
    >
      <div className="text-center mb-8">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          MoodTunes AI
        </motion.h1>
        <p className="text-gray-300 text-lg mb-2">Create the perfect playlist for any mood</p>
        <p className="text-gray-500 text-sm">Powered by AI • Integrated with Spotify</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-white text-sm font-semibold mb-3">
            Describe your mood or theme
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'chill study session', 'energetic workout', 'romantic dinner'..."
            className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-4">
          <Settings className="w-5 h-5 text-green-400" />
          <div className="flex-1">
            <label className="block text-white text-sm font-semibold mb-3">
              Number of songs: <span className="text-green-400">{songCount}</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="range"
              min="5"
              max="30"
              value={songCount}
              onChange={(e) => setSongCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((songCount - 5) / 25) * 100}%, #374151 ${((songCount - 5) / 25) * 100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>5 songs</span>
              <span>30 songs</span>
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Zap className="w-5 h-5" />
          )}
          <span>{loading ? 'Creating your playlist...' : 'Generate Playlist'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlaylistGenerator;