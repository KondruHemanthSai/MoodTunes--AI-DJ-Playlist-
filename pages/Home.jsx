import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlaylistGenerator from '../components/PlaylistGenerator';
import PlaylistDisplay from '../components/PlaylistDisplay';
import { slideUp, staggerContainer } from '../utils/motion';
import { Music, Zap, Heart, Headphones } from 'lucide-react';

const Home = ({ user, onSavePlaylist, onLoginRequired }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const handlePlaylistGenerated = (playlist) => {
    setCurrentPlaylist(playlist);
  };

  const handleSavePlaylist = (playlist) => {
    onSavePlaylist(playlist);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          variants={slideUp}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl border border-gray-700 backdrop-blur-sm"
          >
            <div className="music-wave mb-6">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-400 to-green-600 bg-clip-text text-transparent">
              Your Music, Your Mood
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              AI-powered playlists that understand your vibe
            </p>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Describe any mood, activity, or moment and let our AI create the perfect soundtrack. 
              From study sessions to workout energy, we've got your playlist covered.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={slideUp}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              title: "AI-Powered",
              description: "Smart recommendations based on your mood",
              icon: Zap,
              color: "from-blue-500 to-purple-600"
            },
            {
              title: "Spotify Ready",
              description: "Direct integration with your Spotify account",
              icon: Music,
              color: "from-green-500 to-emerald-600"
            },
            {
              title: "Video Previews",
              description: "Watch music videos for every track",
              icon: Headphones,
              color: "from-red-500 to-pink-600"
            },
            {
              title: "Save & Share",
              description: "Build your personal music library",
              icon: Heart,
              color: "from-purple-500 to-indigo-600"
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-6 bg-gray-900 border border-gray-700 rounded-2xl backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 card-hover"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How It Works */}
        <motion.div
          variants={slideUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Describe Your Mood",
                description: "Tell us what you're feeling or what you're doing"
              },
              {
                step: "02",
                title: "AI Creates Magic",
                description: "Our AI analyzes and curates the perfect playlist"
              },
              {
                step: "03",
                title: "Enjoy & Save",
                description: "Listen on Spotify and save to your library"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-black font-bold text-xl mb-4 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          <PlaylistGenerator
            onPlaylistGenerated={handlePlaylistGenerated}
            user={user}
            onLoginRequired={onLoginRequired}
          />
          
          {currentPlaylist && (
            <PlaylistDisplay
              playlist={currentPlaylist}
              onSave={handleSavePlaylist}
              user={user}
              onLoginRequired={onLoginRequired}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;