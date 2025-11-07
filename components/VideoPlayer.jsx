import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VideoPlayer = ({ songQuery }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate video URL generation (in real app, this would use YouTube API)
    const generateVideoUrl = (query) => {
      const searchQuery = encodeURIComponent(query);
      return `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0&modestbranding=1&fs=1`;
    };

    if (songQuery) {
      setVideoUrl(generateVideoUrl(songQuery));
    }
  }, [songQuery]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`relative bg-black ${isFullscreen ? 'fixed inset-0 z-50' : 'w-full h-96 rounded-lg overflow-hidden'} neon-glow`}
    >
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBack}
          className="p-2 bg-black/70 border border-cyan-400/50 rounded-full text-cyan-400 hover:text-pink-400 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
      </div>

      {videoUrl ? (
        <iframe
          src={videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Music Video"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-cyan-400 text-lg font-semibold">Loading video...</p>
            <p className="text-cyan-600 text-sm mt-2">Searching for: {songQuery}</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-3 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 hover:bg-cyan-500/30 transition-all duration-300 neon-glow"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="p-2 bg-pink-500/20 border border-pink-500/50 rounded-full text-pink-400 hover:bg-pink-500/30 transition-all duration-300"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="text-center flex-1 mx-4">
            <h3 className="text-cyan-100 font-semibold text-lg truncate glitch-text">
              {songQuery}
            </h3>
            <p className="text-cyan-600 text-sm">Music Video</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="p-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 hover:bg-green-500/30 transition-all duration-300"
          >
            <Maximize className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;