'use client';
import { useState, useEffect } from 'react';

export default function FinalClosingPage({ onClose = () => {} }) {
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [hearts, setHearts] = useState([]);
  const [particles, setParticles] = useState([]);
  const [showGiftItems, setShowGiftItems] = useState(false);

 const finalMessage = [
  "Zoha…",
  "",
  "We’ve scrolled through emotions,",
  "Rendered moments only my heart knew,",
  "And executed a connection that distance could never break.",
  "",
  "This place isn’t a website —",
  "It’s a deployed version of everything I feel for you.",
  "A space where code meets emotion,",
  "And silence finally speaks.",
  "",
  "Every pixel here is intentional.",
  "Every animation is a heartbeat I couldn’t say out loud.",
  "Every line exists because you exist.",
  "",
  "Long distance creates gaps, yes…",
  "But love fills them with variables only two hearts understand.",
  "",
  "So whenever you miss me, open this world.",
  "Not to recall the moments we lost,",
  "But to feel the moments I’m committed to creating.",
  "",
  "Because you deserve presence — real, consistent, alive.",
  "And I’m building myself to show up for you like clockwork.",
  "",
  "You are not just special — you’re the constant my life compiles around.",
  "You’re not just unforgettable — you’re the function everything else returns to.",
  "You’re not just my forever — you’re the version of forever that actually makes sense.",
  "",
  "So when life gets heavy,",
  "When the distance feels like a whole new error code,",
  "Come back here.",
  "",
  "This place will always reload you into my universe.",
  "No delays. No glitches. No disconnects.",
  "",
  "From this moment forward,",
  "I’m yours — consistently, intentionally, unconditionally.",
  "",
  "With all my code, all my chaos,",
  "And all my love,",
  "💕 Your Secret Developer 💕"
];


  // Floating hearts setup
  useEffect(() => {
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 5 + Math.random() * 3,
    }));
    setHearts(newHearts);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    let fullText = '';

    const typeText = () => {
      if (currentIndex < finalMessage.length) {
        const line = finalMessage[currentIndex];
        let charIndex = 0;

        const charTimer = setInterval(() => {
          if (charIndex < line.length) {
            fullText += line[charIndex];
            setDisplayedText(fullText);
            charIndex++;
          } else {
            clearInterval(charTimer);
            fullText += '\n';
            currentIndex++;
            setTimeout(typeText, 100);
          }
        }, 25);
      } else {
        // Show gift items after message is complete
        setTimeout(() => setShowGiftItems(true), 500);
      }
    };

    typeText();
  }, []);

  // Particle burst effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['💕', '✨', '💖', '🌹', '💝', '🎂', '🌙'][Math.floor(Math.random() * 7)],
      };
      setParticles(prev => [...prev, newParticle].slice(-40));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-950/98 via-purple-950/98 to-indigo-950/98 backdrop-blur-xl flex items-center justify-center overflow-hidden p-4">
      
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

      {/* Floating hearts - more dense */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-2xl sm:text-3xl md:text-4xl"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animation: `floatHeart ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}

      {/* Particle effects */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-sm sm:text-lg md:text-2xl animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `fadeFloat 2s ease-out forwards`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-3xl w-full">
        <div className="bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-black/60 backdrop-blur-xl rounded-3xl border-2 border-pink-500/40 p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto shadow-2xl">
          
          {/* Decorative top element */}
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="text-6xl sm:text-7xl md:text-8xl mb-2 animate-bounce">💝</div>
            <div className="h-0.5 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto"></div>
          </div>

          {/* Letter content */}
          <div className="text-xs sm:text-sm md:text-base text-pink-50 font-light leading-relaxed whitespace-pre-wrap space-y-3 sm:space-y-4 px-2 mb-6 sm:mb-8">
            {displayedText}
            {displayedText.length > 0 && displayedText.length < 500 && <span className="animate-pulse">▌</span>}
          </div>

          {/* Gift Items - appears after message complete */}
          {showGiftItems && (
            <div className="space-y-6 animate-in mb-6 sm:mb-8">
              <div className="h-0.5 w-20 sm:w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2">
                <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-rose-900/60 to-pink-900/60 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-3xl sm:text-4xl mb-2">💌</div>
                  <p className="text-pink-200 text-xs sm:text-sm font-semibold">Love Letter</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🌹</div>
                  <p className="text-pink-200 text-xs sm:text-sm font-semibold">Memories</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-rose-900/60 to-purple-900/60 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-3xl sm:text-4xl mb-2">💎</div>
                  <p className="text-pink-200 text-xs sm:text-sm font-semibold">Forever Promise</p>
                </div>
                <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-br from-indigo-900/60 to-rose-900/60 border border-pink-500/30 hover:border-pink-500/60 transition-all duration-300 hover:scale-105 text-center">
                  <div className="text-3xl sm:text-4xl mb-2">✨</div>
                  <p className="text-pink-200 text-xs sm:text-sm font-semibold">Magic Moments</p>
                </div>
              </div>
            </div>
          )}

          {/* Continue/Replay Button - appears when message is complete */}
          {displayedText.length > 400 && (
            <div className="flex flex-col gap-3 sm:gap-4 justify-center animate-in fade-in duration-1000">
              <div className="h-0.5 w-20 sm:w-24 md:w-32 mx-auto bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
              <button
                onClick={handleClose}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 mx-auto"
              >
                Return to Journey 🌟
              </button>
              <p className="text-xs sm:text-xs md:text-sm text-pink-300/60 text-center font-mono">
                Visit again whenever you miss me 💕
              </p>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 text-9xl opacity-10 pointer-events-none">
            💝
          </div>
          <div className="absolute top-20 left-0 text-9xl opacity-10 pointer-events-none">
            💕
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatHeart {
          0% {
            bottom: -50px;
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

        @keyframes fadeFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-in {
          animation: fadeIn 1s ease-in;
        }
      `}</style>
    </div>
  );
}
