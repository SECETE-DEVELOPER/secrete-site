'use client';
import { useEffect, useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating music indicator */}
      <div className={`p-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-md rounded-full border border-pink-400/30 shadow-lg transition-all ${isPlaying ? 'scale-110' : 'scale-100'}`}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
          title={isPlaying ? 'Mute' : 'Play Music'}
        >
          {isPlaying ? '🎵' : '🔇'}
        </button>
      </div>

      {/* Hidden YouTube player */}
      {isPlaying && (
        <div className="fixed bottom-24 left-6 z-40 w-64 rounded-lg overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/2er9ukbfa0M?autoplay=0&controls=1&modestbranding=1"
            title="SHOR - Mooroo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
