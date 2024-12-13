'use client';

import { useState } from 'react';
import { CaptionSection, ImageCreation, UserInput } from "~/features";
import {ErrorAlert, LoadingSpinner} from "~/components";

type ImageResponse = { url: string };
type CaptionResponse = { caption: string };
type ErrorResponse = {
  error: string;
};

export default function HomePage() {
  const [prompt, setPrompt] = useState('apple falling from the tree');
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);

  const clearError = () => setError('');

  const generateImage = async () => {
    if (!prompt) return;

    setLoading(true);
    setError('');
    try {
      const [imageRes, captionRes] = await Promise.all([
        fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify({ prompt, width, height })
        }),
        fetch('/api/generate-caption', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
          body: JSON.stringify({ prompt })
        })
      ]);

      if (!imageRes.ok) {
        const { error: imageError } = (await imageRes.json()) as ErrorResponse;
        setError(imageError ?? 'Failed to generate image');
        return;
      }
      if (!captionRes.ok) {
        const captionJson = (await captionRes.json()) as ErrorResponse;
        const captionError = captionJson.error ?? 'Failed to generate caption';
        setError(captionError);
        return;
      }

      const imageData = (await imageRes.json()) as ImageResponse;
      const captionData = (await captionRes.json()) as CaptionResponse;

      setImage(imageData.url);
      setCaption(captionData.caption);
    } catch (error) {
      console.error(error);
      setImage(null);
      setCaption('Failed to generate content');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-100 p-4 md:p-8 gap-6">
        <UserInput
            prompt={prompt}
            setPrompt={setPrompt}
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            loading={loading}
            onGenerate={generateImage}
        />

        <div className="w-full md:w-2/3 flex flex-col items-center">
          {error && <ErrorAlert message={error} onClose={clearError} />}
          {loading && <LoadingSpinner />}
          {!loading && (
              <div className="bg-gray-100 p-4 md:p-6 rounded-lg border border-gray-300 shadow-sm w-full">
                <ImageCreation image={image} width={width} height={height} />
                {image && (
                    <div className="mt-4">
                      <CaptionSection caption={caption} setCaption={setCaption} />
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
  );
}
