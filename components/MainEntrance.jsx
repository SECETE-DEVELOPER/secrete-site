'use client';
import { useState, useEffect } from 'react';

export default function MainEntrance({ onContinue = () => {} }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [hearts, setHearts] = useState([]);

  const mainText = 'I\'m Sorry I Was Late';
  const subText = 'But my love was never late 💕';

  useEffect(() => {
    // Typewriter for main text
    let index = 0;
    const timer = setInterval(() => {
      if (index < mainText.length) {
        setDisplayedText(mainText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Generate floating hearts
  useEffect(() => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-950/95 via-purple-950/95 to-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden">
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

      {/* Floating hearts background */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          style={{
            left: `${heart.left}%`,
            bottom: '-60px',
            animation: `floatHeart ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8 w-full max-w-2xl">
        
        {/* Top decoration */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-bounce">✨</div>

        {/* Main heading */}
        <div className="text-center space-y-1 sm:space-y-2 md:space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 min-h-12 sm:min-h-16 md:min-h-20 px-2">
            {displayedText}
            {displayedText.length > 0 && displayedText.length < mainText.length && (
              <span className="animate-blink">|</span>
            )}
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 my-2 sm:my-3 md:my-4">
            <div className="h-0.5 w-6 sm:w-8 md:w-10 bg-gradient-to-r from-transparent to-pink-500"></div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl">💝</div>
            <div className="h-0.5 w-6 sm:w-8 md:w-10 bg-gradient-to-l from-transparent to-pink-500"></div>
          </div>

          {/* Subtext */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-pink-200/80 font-light mt-2 sm:mt-2 md:mt-3">
            {subText}
          </p>
        </div>

        {/* Content description */}
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 space-y-2 sm:space-y-2 md:space-y-3 text-center px-2">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-pink-100/70 font-light leading-relaxed">
            Inside you'll find a heartfelt apology,
            <br className="hidden sm:block" />
            wrapped in years of love and commitment.
          </p>
          <p className="text-xs sm:text-xs md:text-sm lg:text-base text-pink-300/60 font-light">
            💔 Regret • 💌 Love • ✨ Forever • 💎 Promise
          </p>
          <p className="text-xs sm:text-xs md:text-sm lg:text-base text-pink-300/60 font-light">
            Late birthday gift, eternal love for you, ZOHA 💕
          </p>
        </div>

        {/* CTA Button */}
        {showButton && (
          <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-10 w-full flex justify-center animate-in fade-in duration-1000 px-2">
            <button
              onClick={onContinue}
              className="px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3 lg:py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 min-w-fit max-w-xs text-center"
            >
              Begin My Journey 💕
            </button>
          </div>
        )}

        {/* Bottom decoration */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 text-xs sm:text-xs md:text-sm lg:text-base text-pink-300/50 font-mono">
          — With infinite love
        </div>
      </div>

      <style jsx>{`
        @keyframes floatHeart {
          0% {
            bottom: -60px;
            opacity: 0;
            transform: translateX(0) scale(1);
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
            transform: translateX(${Math.random() * 200 - 100}px) rotate(360deg) scale(0.5);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 0.7s infinite;
        }

        .animate-in {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
