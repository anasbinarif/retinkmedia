'use client';

import { useState } from 'react';
import axios from "axios";

type ImageResponse = { url: string };
type CaptionResponse = { caption: string };

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const imageResponse = await axios.post<ImageResponse>(
          '/api/generate-image',
          { prompt },
          { headers: { 'Content-Type': 'application/json' } }
      );
      setImage(imageResponse.data.url);

      const captionResponse = await axios.post<CaptionResponse>(
          '/api/generate-caption',
          { prompt },
          { headers: { 'Content-Type': 'application/json' } }
      );
      setCaption(captionResponse.data.caption);
    } catch {
      setImage(null);
      setCaption(`Failed to generate content`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Image Generator</h1>
        <div className="flex items-center space-x-4 mb-6">
          <input
              type="text"
              placeholder="Enter your prompt..."
              className="px-4 py-2 border rounded-lg w-80"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
          />
          <button
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={generateImage}
              disabled={loading}
          >
            {loading ? 'Generating...' : 'Run'}
          </button>
        </div>

        {image && (
            <div className="mt-8 text-center">
              <img src={image} alt="Generated" className="rounded-lg shadow-lg max-w-full h-auto" />
              <p className="mt-4 text-lg italic text-gray-800">{caption}</p>
            </div>
        )}
      </div>
  );
}