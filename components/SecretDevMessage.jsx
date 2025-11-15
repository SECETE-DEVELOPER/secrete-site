'use client';
import { useEffect, useState } from 'react';

export default function FinalLoveMessage({ onClose = () => {} }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-900/90 via-pink-900/90 to-purple-900/90 backdrop-blur-xl flex items-center justify-center overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main message */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-3xl mx-auto">
        {/* Celebration */}
        <div className="space-y-4">
          <div className="text-7xl animate-bounce space-y-2">
            ✨
          </div>

          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 animate-pulse">
            You Did It, ZOHU!
          </h1>

          <p className="text-2xl text-pink-100 font-light">
            🎉 You Unlocked My Secret Message 🎉
          </p>
        </div>

        {/* The main message */}
        <div className="space-y-8 py-8">
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>

          <div className="space-y-6 text-lg text-pink-50 font-light leading-relaxed">
            <p>
              You know what? Being late doesn't matter...
            </p>

            <p>
              Because every moment with you is worth celebrating. 💕
            </p>

            <div className="text-5xl py-4">
              💝
            </div>

            <p>
              This whole experience? It's just me trying to capture how special you make everything feel.
            </p>

            <p>
              From a boy who sees the world in color because of you,
            </p>

            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-pink-300">
              — Your Secret Developer 💕
            </p>
          </div>

          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>

          <div className="space-y-2 text-sm text-pink-200/60">
            <p>Happy Late Birthday, ZOHU</p>
            <p>May your year be filled with as much love as you bring to the world 🌟</p>
          </div>
        </div>

        {/* Confetti animation */}
        <div className="text-4xl flex justify-center gap-8 animate-pulse">
          <span>🎂</span>
          <span>💝</span>
          <span>🎂</span>
          <span>💕</span>
          <span>🎂</span>
        </div>
      </div>
    </div>
  );
}
