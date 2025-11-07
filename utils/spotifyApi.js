// Spotify Web API integration utilities
// Note: This is a simplified implementation for demo purposes
// In production, you would need proper Spotify API authentication

const SPOTIFY_BASE_URL = 'https://open.spotify.com';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Mock Spotify track IDs for demo purposes
const DEMO_TRACK_IDS = [
  '4u7EnebtmKWzUH433cf5Qv', // Bohemian Rhapsody
  '5ChkMS8OtdzJeqyybCc9R5', // Billie Jean
  '40riOy7x9W7GXjyGp4pjAv', // Hotel California
  '7o2CTH4ctstm8TNelqjb51', // Sweet Child O' Mine
  '7pKfPomDEeI4TPT6EOYjn9', // Imagine
  '4VqPOruhp5EdPBeR92t6lQ', // Uptown Funk
  '2WfaOiMkCvy7F5fcp2zZ8L', // Shape of You
  '7qiZfU4dY1lWllzX7mPBI3', // Blinding Lights
  '1Je1IMUlBXcx1Fz0WE7oPT', // Watermelon Sugar
  '11dFghVXANMlKmJXsNCbNl'  // Levitating
];

export const generateSpotifyUrl = (songTitle, artist) => {
  // In a real implementation, you would search for the track using Spotify API
  // For demo purposes, we'll return a random track URL
  const randomTrackId = DEMO_TRACK_IDS[Math.floor(Math.random() * DEMO_TRACK_IDS.length)];
  return `${SPOTIFY_BASE_URL}/track/${randomTrackId}`;
};

export const searchSpotifyTrack = async (query) => {
  // Mock search function - in production, this would use Spotify Web API
  // Requires authentication token and proper API setup
  
  try {
    // Simulated API response
    const mockResponse = {
      tracks: {
        items: [{
          id: DEMO_TRACK_IDS[0],
          name: query.split(' ')[0] || 'Unknown Track',
          artists: [{ name: 'Unknown Artist' }],
          external_urls: {
            spotify: generateSpotifyUrl(query, 'artist')
          },
          preview_url: null,
          duration_ms: 180000
        }]
      }
    };
    
    return mockResponse.tracks.items[0];
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return null;
  }
};

export const createSpotifyPlaylist = async (userId, playlistName, trackUris) => {
  // Mock playlist creation - in production, this would create an actual Spotify playlist
  // Requires Spotify Premium and proper authentication
  
  console.log('Creating Spotify playlist:', {
    userId,
    playlistName,
    trackCount: trackUris.length
  });
  
  // Return mock playlist ID
  return `playlist_${Date.now()}`;
};

export const getTrackFeatures = async (trackId) => {
  // Mock audio features - in production, this would return actual Spotify audio features
  return {
    danceability: Math.random(),
    energy: Math.random(),
    valence: Math.random(),
    tempo: 120 + Math.random() * 60,
    acousticness: Math.random(),
    instrumentalness: Math.random()
  };
};

export const formatSpotifyUri = (trackId) => {
  return `spotify:track:${trackId}`;
};

export const extractTrackIdFromUrl = (spotifyUrl) => {
  const match = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

export const openSpotifyTrack = (spotifyUrl) => {
  // Open Spotify track in new tab
  window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
};

export const generatePlaylistShareUrl = (playlistId) => {
  return `${SPOTIFY_BASE_URL}/playlist/${playlistId}`;
};

// Helper function to validate Spotify URLs
export const isValidSpotifyUrl = (url) => {
  const spotifyUrlPattern = /^https:\/\/open\.spotify\.com\/(track|album|playlist|artist)\/[a-zA-Z0-9]+/;
  return spotifyUrlPattern.test(url);
};

// Mock authentication status
export const isSpotifyAuthenticated = () => {
  // In production, check for valid access token
  return localStorage.getItem('spotify_access_token') !== null;
};

export const initiateSpotifyAuth = () => {
  // In production, redirect to Spotify authorization URL
  console.log('Initiating Spotify authentication...');
  // For demo, simulate successful auth
  localStorage.setItem('spotify_access_token', 'demo_token');
  return Promise.resolve('demo_token');
};