import React, { useState, useEffect } from 'react';
import './App.css';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

const App = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.example.com/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gold mb-4">GoldTube</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white shadow-md p-4">
            <img src={video.thumbnail} alt={video.title} />
            <h2 className="text-xl font-bold text-gold mb-2">{video.title}</h2>
            <p className="text-gray-600">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;