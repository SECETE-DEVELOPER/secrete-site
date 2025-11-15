'use client';
import { useState, useEffect } from 'react';
import { useMusic } from '../hooks/useMusic';

export default function MusicControl() {
  const music = useMusic();
  const [showControl, setShowControl] = useState(false);
  const [wasAutoplayBlocked, setWasAutoplayBlocked] = useState(false);

  // Show control if music hasn't started after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (music?.isReady && !music?.isPlaying) {
        console.log('⚠️ Autoplay may have been blocked, showing manual control');
        setShowControl(true);
        setWasAutoplayBlocked(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [music?.isReady, music?.isPlaying]);

  // Hide control once music starts playing
  useEffect(() => {
    if (music?.isPlaying) {
      setShowControl(false);
    }
  }, [music?.isPlaying]);

  const handlePlayMusic = () => {
    if (music?.play) {
      music.play().catch((err) => {
        console.error('Failed to play music:', err);
      });
    }
  };

  const handlePauseMusic = () => {
    if (music?.pause) {
      music.pause();
    }
  };

  if (!music?.isReady) return null;

  return (
    <>
      {/* Floating Music Control Button */}
      {showControl && !music?.isPlaying && (
        <div className="fixed bottom-6 left-6 z-40 animate-bounce">
          <button
            onClick={handlePlayMusic}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-sm rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 flex items-center gap-2"
          >
            <span>🎵</span> Play Music
          </button>
          <p className="text-xs text-pink-300/60 mt-2 text-center">Tap to enjoy the music 💕</p>
        </div>
      )}

      {/* Music Playing Indicator */}
      {music?.isPlaying && (
        <div className="fixed bottom-6 left-6 z-40">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-900/60 to-purple-900/60 backdrop-blur-xl border border-pink-500/30 rounded-full">
            <span className="text-lg animate-pulse">🎵</span>
            <span className="text-xs text-pink-200 font-mono">Now Playing</span>
            <button
              onClick={handlePauseMusic}
              className="ml-2 text-xs px-2 py-1 bg-pink-500/30 hover:bg-pink-500/50 rounded-full transition-colors"
            >
              Pause
            </button>
          </div>
        </div>
      )}
    </>
  );
}
