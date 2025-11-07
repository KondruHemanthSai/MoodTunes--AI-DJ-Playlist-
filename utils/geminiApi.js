// Gemini AI API integration for playlist generation

const GEMINI_API_KEY = 'AIzaSyBqk3fZPNha_X1OOGxqlXW-Iq3DKYv7p5Q';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generatePlaylist = async (prompt, songCount = 10) => {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Create a music playlist based on this mood/theme: "${prompt}". 
              
              Generate exactly ${songCount} songs that match this vibe. For each song, provide:
              - Song title
              - Artist name
              - A brief description of why it fits the mood
              - A Spotify URL (use format: https://open.spotify.com/track/[trackid])
              
              Format the response as a JSON object with:
              {
                "title": "Playlist name that captures the mood",
                "description": "Brief description of the playlist theme",
                "songs": [
                  {
                    "title": "Song Title",
                    "artist": "Artist Name",
                    "description": "Why this song fits the mood in 10 words",
                    "spotifyUrl": "https://open.spotify.com/track/example"
                  }
                ]
              }
              
              Make sure the playlist has a cohesive theme and the songs flow well together. Focus on popular, well-known songs when possible.`
            }
          ]
        }
      ]
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid API response structure');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const playlist = JSON.parse(jsonMatch[0]);
    
    // Validate the playlist structure
    if (!playlist.title || !playlist.songs || !Array.isArray(playlist.songs)) {
      throw new Error('Invalid playlist structure');
    }

    // Ensure all songs have required fields
    playlist.songs = playlist.songs.map(song => ({
      title: song.title || 'Unknown Title',
      artist: song.artist || 'Unknown Artist',
      description: song.description || 'Great song for this mood',
      spotifyUrl: song.spotifyUrl || 'https://open.spotify.com/search/' + encodeURIComponent(`${song.title} ${song.artist}`)
    }));

    return playlist;

  } catch (error) {
    console.error('Error generating playlist:', error);
    
    // Fallback playlist for demo purposes
    return {
      title: `${prompt} Vibes`,
      description: `A curated playlist capturing the essence of "${prompt}"`,
      songs: [
        {
          title: "Good 4 U",
          artist: "Olivia Rodrigo",
          description: "Perfect energy for any mood",
          spotifyUrl: "https://open.spotify.com/track/4ZtFanR9U6ndgddUvNcjcG"
        },
        {
          title: "Blinding Lights",
          artist: "The Weeknd",
          description: "Upbeat and energetic",
          spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN"
        },
        {
          title: "Levitating",
          artist: "Dua Lipa",
          description: "Feel-good vibes",
          spotifyUrl: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9"
        },
        {
          title: "Watermelon Sugar",
          artist: "Harry Styles",
          description: "Sweet and refreshing",
          spotifyUrl: "https://open.spotify.com/track/6UelLqGlWMcVH1E5c4H7lY"
        },
        {
          title: "drivers license",
          artist: "Olivia Rodrigo",
          description: "Emotional depth",
          spotifyUrl: "https://open.spotify.com/track/5wANPM4fQCJwkGd4rN57mH"
        }
      ].slice(0, songCount)
    };
  }
};

// Helper function to validate Spotify URLs
export const validateSpotifyUrl = (url) => {
  const spotifyRegex = /^https:\/\/open\.spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+/;
  return spotifyRegex.test(url);
};

// Helper function to create Spotify search URL
export const createSpotifySearchUrl = (title, artist) => {
  const query = encodeURIComponent(`${title} ${artist}`);
  return `https://open.spotify.com/search/${query}`;
};

// Helper function to extract track ID from Spotify URL
export const extractSpotifyTrackId = (url) => {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};