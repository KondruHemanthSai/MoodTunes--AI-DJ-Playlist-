import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Play, Music } from 'lucide-react';

const YOUTUBE_API_KEY = 'AIzaSyDoliBixI13eRMau-Qt0H7DsLeNpKjKLZ8'; // Replace with your key

const VideoView = () => {
  const { songId } = useParams();
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const decodedSong = decodeURIComponent(songId);

  useEffect(() => {
    const fetchYouTubeVideo = async () => {
      try {
        setLoading(true);
        setError('');

        const query = encodeURIComponent(decodedSong);
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${query}&key=${YOUTUBE_API_KEY}`
        );
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          setVideoUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
        } else {
          setError('No video found for this song.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    if (songId) {
      fetchYouTubeVideo();
    }
  }, [songId]);

  const handleBackToPlaylist = () => navigate(-1);

  const handleOpenYouTube = () => {
    const query = encodeURIComponent(decodedSong);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const handleOpenSpotify = () => {
    const query = encodeURIComponent(decodedSong);
    window.open(`https://open.spotify.com/search/${query}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToPlaylist}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Playlist</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenYouTube}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-full text-white transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Search on YouTube</span>
          </motion.button>
        </motion.div>

        {/* Song Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{decodedSong}</h1>
          <p className="text-gray-400">Music Video</p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 aspect-video flex items-center justify-center"
        >
          {loading ? (
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-gray-400">Loading video...</p>
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Video Not Available</h3>
              <p className="text-gray-400 mb-6">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleOpenYouTube}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Play className="w-4 h-4" />
                <span>Search on YouTube</span>
              </motion.button>
            </div>
          ) : (
            <iframe
              src={videoUrl}
              title={`Music video for ${decodedSong}`}
              className="w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-gray-900 rounded-2xl border border-gray-700"
        >
          <h2 className="text-xl font-bold text-white mb-4">Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleOpenYouTube}
              className="w-full p-3 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Watch on YouTube</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleOpenSpotify}
              className="w-full p-3 bg-green-500 hover:bg-green-400 text-black rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Listen on Spotify</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoView;
