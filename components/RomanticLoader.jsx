'use client';
import { useState, useEffect } from 'react';

export default function RomanticLoader({ onComplete = () => {} }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  // Simulate loading
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 5 + Math.random() * 5,
      emoji: ['💕', '✨', '💖', '🌹', '💝'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-rose-950/95 via-purple-950/95 to-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles background */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-sm sm:text-lg md:text-2xl opacity-40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 w-full max-w-xl">
        
        {/* Animated heart loader */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-3 sm:border-4 md:border-4 border-transparent border-t-pink-400 border-r-pink-300 animate-spin" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-full border-2 sm:border-3 md:border-3 border-rose-400/30 animate-pulse" />
          
          {/* Center heart */}
          <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl animate-pulse">
            💕
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
          <p className="text-base sm:text-lg md:text-2xl font-light text-pink-100 tracking-wider">
            A Late Birthday Gift
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-purple-200">
            But Made With All My Love ✨
          </p>
          <p className="text-xs sm:text-xs md:text-sm text-pink-300/70 font-light mt-2 sm:mt-3">
            🎁 Sorry for being late, but my love is eternal 🎁
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mt-6 sm:mt-8 md:mt-10">
          <div className="relative h-0.5 sm:h-1 md:h-1.5 bg-rose-900/40 rounded-full overflow-hidden border border-pink-500/20">
            <div
              className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs sm:text-xs md:text-sm text-pink-300/60 mt-2 sm:mt-3 font-mono">
            {Math.floor(progress)}%
          </p>
        </div>

        {/* Loading message */}
        <div className="text-center mt-6 sm:mt-8 md:mt-10">
          <p className="text-xs sm:text-xs md:text-sm text-pink-300/80 font-light animate-pulse">
            Creating magic... 💫
          </p>
        </div>

        {/* Floating hearts animation */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 space-x-2 sm:space-x-3 md:space-x-4 flex justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="text-lg sm:text-xl md:text-2xl"
              style={{
                animation: `floatUp 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-150px) translateX(${Math.random() * 100 - 50}px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
