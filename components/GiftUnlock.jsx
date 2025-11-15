'use client';
import { useState, useEffect } from 'react';

export default function GiftUnlock({ onComplete = () => {} }) {
  const [show, setShow] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState([]);

  const gifts = [
    { icon: '💝', title: 'Love Letter', color: 'rose' },
    { icon: '💌', title: 'Memories', color: 'pink' },
    { icon: '🎁', title: 'Special Moment', color: 'purple' },
    { icon: '💎', title: 'Forever Promise', color: 'indigo' },
  ];

  // Generate confetti on open
  useEffect(() => {
    if (isOpening) {
      const confettiPieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1,
        emoji: ['🎉', '✨', '💕', '🌹', '💫', '🎊'][Math.floor(Math.random() * 6)],
      }));
      setConfetti(confettiPieces);

      setTimeout(() => {
        setIsOpened(true);
      }, 800);
    }
  }, [isOpening]);

  const handleGiftClick = () => {
    setIsOpening(true);
  };

  const handleComplete = () => {
    setShow(false);
    setTimeout(onComplete, 500);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-950/95 via-purple-950/95 to-indigo-950/95 backdrop-blur-xl flex items-center justify-center overflow-hidden p-4">
      
      {/* Animated starfield background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
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

      {/* Confetti animation */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="fixed text-2xl pointer-events-none"
          style={{
            left: `${piece.x}%`,
            top: '-50px',
            animation: `confettiFall ${piece.duration}s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        >
          {piece.emoji}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="text-7xl mb-4 animate-bounce">🎁</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200">
              You Have A Gift! 💝
            </h1>
            <p className="text-pink-200/80 text-sm sm:text-base md:text-lg">
              A special collection of memories waiting for you...
            </p>
          </div>

          {/* Gift Box - Interactive */}
          <div className="flex justify-center">
            <div
              onClick={handleGiftClick}
              className="relative cursor-pointer transition-transform duration-300 hover:scale-110 group"
            >
              {/* Gift box */}
              <div className={`
                w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 
                rounded-lg shadow-2xl relative
                transition-all duration-500
                ${isOpened ? 'scale-0 opacity-0' : 'scale-100'}
              `}>
                {/* Ribbon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-yellow-200 absolute transform -rotate-45"></div>
                  <div className="w-full h-1 bg-yellow-200 absolute transform rotate-45"></div>
                </div>

                {/* Bow */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="text-5xl sm:text-6xl md:text-7xl animate-bounce">🎀</div>
                </div>

                {/* Gift icon */}
                <div className="w-full h-full flex items-center justify-center text-6xl sm:text-7xl md:text-8xl">
                  💝
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Opened gift burst */}
              {isOpened && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl sm:text-9xl md:text-10xl animate-ping">✨</div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          {!isOpening && (
            <p className="text-pink-300/80 text-xs sm:text-sm md:text-base font-light animate-pulse">
              👆 Click the gift to open it
            </p>
          )}

          {/* Gift contents - appears after opening */}
          {isOpened && (
            <div className="animate-in space-y-6">
              <p className="text-pink-100 text-sm sm:text-base md:text-lg font-light">
                Inside your gift...
              </p>

              {/* Gift items grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {gifts.map((gift, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 md:p-6 rounded-xl bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-black/40 backdrop-blur-xl border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-105 animate-in"
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-2">
                      {gift.icon}
                    </div>
                    <p className="text-pink-100 text-xs sm:text-sm md:text-base font-semibold">
                      {gift.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action button */}
              <button
                onClick={handleComplete}
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-sm sm:text-base md:text-lg rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 mx-auto block mt-6 sm:mt-8"
              >
                Explore Your Gifts 💕
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) translateX(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
