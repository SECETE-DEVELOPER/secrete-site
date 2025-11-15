'use client';
import { useState, useEffect } from 'react';

export default function RomanticIntro({ onContinue = () => {} }) {
  const [show, setShow] = useState(true);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate floating hearts
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 2,
      }));
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  const handleContinue = () => {
    setShow(false);
    setTimeout(onContinue, 500);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-black/90 backdrop-blur-lg flex items-center justify-center overflow-hidden">
      {/* Floating hearts background */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-4xl animate-pulse"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `float ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💝
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 animate-pulse">
            Happy Late Birthday! 🎂
          </h1>
          
          <p className="text-xl text-pink-200 font-light">
            I know I'm late... 😅
          </p>
        </div>

        <div className="space-y-4 py-8">
          <p className="text-lg text-cyan-300 font-mono">
            But I made something special just for you...
          </p>
          
          <div className="text-6xl animate-bounce space-y-2">
            <div>🧸</div>
            <div>💕</div>
            <div>🧸</div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-purple-200">
            A digital gift from a developer who thinks you deserve the world 🌟
          </p>
          
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-full transition-all transform hover:scale-110 hover:shadow-2xl"
          >
            Let's Begin 💕
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            bottom: -50px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            bottom: 100vh;
            opacity: 0;
            transform: translateX(${Math.random() * 200 - 100}px);
          }
        }
      `}</style>
    </div>
  );
}
