'use client';
import { useState, useEffect } from 'react';

export default function EnterMyWorld({ onContinue = () => {} }) {
  const [stage, setStage] = useState('intro'); // intro -> message -> shayari -> enter
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [hearts, setHearts] = useState([]);
  const [particles, setParticles] = useState([]);

  // Intro text
  const introText = 'To ZOHA... Late, but with all my heart';

  // Main romantic message - shown during message stage
  const mainMessage = [
    'I\'m sorry I was late for your birthday...',
    '',
    'But I promise to make every day after count. 💕',
  ];

  // Jaun Elia inspired Shayari (Apology & Deep Love)
  const shayariLines = [
  "❤️ Late Birthday Vibes — Dev Style, Dil Se...",

  "“Haan, main teri birthday pe late ho gaya...",
  "Par Roohi, tu koi event nahi jo date se bound ho.",
  "Tu to wo feeling hai jo har update ke baad aur gehri hoti jaati hai.”",

  "",

  "“Meri life ka sabse lamba bug — distance.",
  "Aur sabse khoobsurat feature — tu.”",

  "",

  "“Har message draft ki tarah reh gaya,",
  "Har call ek unsent request ban gayi…”",

  "",

  "“Par ab ek promise push kar raha hoon:",
  "Jahan tu hogi, wahan mere saare moments deploy honge.”",

  "",

  "“Teri birthday ek din thi...",
  "Par main to roz hi tujhe celebrate karta hoon, silently… background process ki tarah.”"
];

  // Floating hearts setup
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  // Typewriter effect for each stage
  useEffect(() => {
    let timer;
    let index = 0;
    let char = 0;
    let fullText = '';

    const lines = stage === 'intro' ? [introText] : stage === 'message' ? mainMessage : shayariLines;

    const typeText = () => {
      if (index < lines.length) {
        const line = lines[index];
        if (char < line.length) {
          fullText += line[char];
          setDisplayedText(fullText);
          char++;
        } else {
          fullText += '\n';
          index++;
          char = 0;
        }
        timer = setTimeout(typeText, stage === 'intro' ? 100 : 50);
      }
    };

    typeText();
    return () => clearTimeout(timer);
  }, [stage]);

  // Manual button handlers instead of auto-transition
  const handleNextStage = () => {
    setDisplayedText('');
    if (stage === 'intro') {
      setStage('message');
    } else if (stage === 'message') {
      setStage('shayari');
    }
  };

  // Also allow skipping intro directly to continue journey
  const handleSkip = () => {
    setDisplayedText('');
    setStage('message');
  };

  // Particle burst effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['💕', '✨', '💖', '🌹', '💝'][Math.floor(Math.random() * 5)],
      };
      setParticles(prev => [...prev, newParticle].slice(-30));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    setShow(false);
    setTimeout(onContinue, 500);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-950/95 via-pink-950/95 to-purple-950/95 backdrop-blur-xl flex items-center justify-center overflow-hidden pointer-events-auto">
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

      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-xl sm:text-2xl md:text-3xl lg:text-4xl"
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
      <div className="relative z-10 text-center space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto h-[80vh] flex flex-col justify-between pointer-events-auto">
        
        {/* Header - Secret Developer signature */}
        {stage !== 'shayari' && (
          <div className="space-y-2 sm:space-y-2.5 md:space-y-3 flex-1 flex flex-col justify-center">
            <p className="text-xs sm:text-xs md:text-sm uppercase tracking-widest text-pink-300/60 font-mono animate-pulse">
              — A Secret Developer
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 leading-tight">
              {displayedText}
              {displayedText.length > 0 && <span className="animate-blink">|</span>}
            </h1>
          </div>
        )}

        {/* Message content */}
        {stage === 'message' && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
            <div className="text-4xl sm:text-5xl md:text-6xl animate-bounce">💝</div>
            <div className="text-xs sm:text-sm md:text-base text-pink-100 font-light leading-relaxed whitespace-pre-wrap px-2">
              {displayedText}
              <span className="animate-pulse">▌</span>
            </div>
          </div>
        )}

        {/* Shayari section */}
        {stage === 'shayari' && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
            <div className="text-5xl sm:text-6xl md:text-7xl animate-bounce mb-3 sm:mb-4">✨</div>
            <div className="text-xs sm:text-sm md:text-base text-pink-100 font-light leading-relaxed italic whitespace-pre-wrap max-h-[50vh] overflow-y-auto px-2">
              {displayedText}
              <span className="animate-pulse">▌</span>
            </div>
            <div className="text-xs sm:text-sm md:text-base text-purple-300 mt-3 sm:mt-4 md:mt-6">
              In every heartbeat, I feel you. 💕
            </div>
          </div>
        )}

        {/* Bottom buttons - responsive */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 pb-4 sm:pb-6 md:pb-8 items-center pointer-events-auto">
          {/* Continue/Next Stage Button */}
          {stage === 'intro' && displayedText === introText && (
            <button
              onClick={() => {
                console.log('✅ Continue button clicked - intro to message');
                handleNextStage();
              }}
              className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 min-w-fit animate-in cursor-pointer"
            >
              Continue 💕
            </button>
          )}

          {/* Skip button - always available for testing */}
          {(stage === 'intro' || stage === 'message') && (
            <button
              onClick={() => {
                console.log('⏭️ Skip button clicked');
                handleNextStage();
              }}
              className="px-4 sm:px-6 py-2 bg-pink-500/50 hover:bg-pink-500/70 text-white font-semibold text-xs sm:text-sm rounded-full transition-all cursor-pointer"
            >
              Skip →
            </button>
          )}

          {/* Next Button for message stage */}
          {stage === 'message' && displayedText.length > 20 && (
            <button
              onClick={() => {
                console.log('➡️ Next button clicked - message to shayari');
                handleNextStage();
              }}
              className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 min-w-fit animate-in cursor-pointer"
            >
              Next ✨
            </button>
          )}

          {/* Enter My World Button - only for shayari stage */}
          {stage === 'shayari' && displayedText.length > 100 && (
            <button
              onClick={() => {
                console.log('🌍 Enter My World button clicked');
                handleContinue();
              }}
              className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 min-w-fit animate-in cursor-pointer"
            >
              Enter My World 💕
            </button>
          )}

          {/* Debug Info */}
          <div className="text-xs text-pink-300/50 mt-2">
            Stage: {stage} | Text: {displayedText.length} chars
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
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
