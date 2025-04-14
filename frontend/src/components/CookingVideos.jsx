import React, { useState } from "react";
import axios from "axios";
import './CookingVideos.css';
import { assets } from '../assets/frontend_assets/assets';

export const Video = () => {
  const [query, setQuery] = useState("");
  const [videoId, setVideoId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const cookingKeywords = [
    'cooking', 'recipe', 'recipes', 'meal prep', 'baking', 'cuisine',
    'food', 'ingredients', 'dinner', 'lunch', 'breakfast', 'gourmet',
    'healthy cooking', 'cooking tips', 'cooking tutorial', 'chef',
    'home cooking', 'cooking techniques'
  ];

  const isCookingQuery = (query) => {
    return cookingKeywords.some(keyword =>
      query.toLowerCase().includes(keyword)
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isCookingQuery(query)) {
      setErrorMessage("This is only for cooking purposes. Please include cooking-related keywords.");
      return;
    }

    const combinedQuery = query.trim();
    const API_KEY = "AIzaSyCmGMqBWPd684cFCKL4kVsV4fEZR0xmg2Y";    
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(combinedQuery)}&type=video&maxResults=10&key=${API_KEY}`;

    try {
      if (combinedQuery.length > 1) {
        const response = await axios.get(url);
        if (response.data.items.length > 0) {
          setSearchResults(response.data.items);
          setVideoId(response.data.items[0].id.videoId);
        } else {
          alert("No videos found for the given query.");
        }
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setErrorMessage("There was an error fetching the videos. Please try again.");
    }
  };

  const handleVideoSelect = (id) => {
    setVideoId(id);
  };

  return (
    <div className="video-container">
      <form onSubmit={handleSearch}>
        <div className="info-section">
          <img
            className='info-icon'
            src={assets.info}
            alt="Cooking Video Info"
            onClick={() => setShowInfo(!showInfo)}
          />
          {showInfo && (
            <div className="info-text">
              <h3>🍳 About This Cooking Video Search Tool</h3>
              <p>
                This tool helps you discover a variety of cooking videos, from quick meal ideas to gourmet recipes. Whether you're a beginner or an experienced cook, use this search to find videos that match your culinary interests.
              </p>
              <h4>🔍 Suggested Keywords:</h4>
              <ul>
                <li><strong>Meal Types:</strong> breakfast, lunch, dinner, snacks</li>
                <li><strong>Cooking Methods:</strong> baking, grilling, slow cooker, air fryer</li>
                <li><strong>Dietary Preferences:</strong> vegan, keto, gluten-free, paleo</li>
                <li><strong>Cuisine Styles:</strong> Italian, Indian, Mexican, Asian</li>
                <li><strong>Dish Types:</strong> soups, salads, desserts, appetizers</li>
                <li><strong>Ingredients:</strong> chicken, tofu, pasta, quinoa</li>
              </ul>
              <p><em>Example:</em> <strong>"Easy vegan dinner recipes"</strong></p>
            </div>
          )}
        </div>

        <h1>🍽️ Food Video Player</h1>

        <div className="video-search-bar">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a cooking video"
          />
          <button type="submit">Search</button>
        </div>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        {videoId && (
          <div className="video-player">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((item) => (
                <li key={item.id.videoId}>
                  <button onClick={() => handleVideoSelect(item.id.videoId)}>
                    {item.snippet.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
