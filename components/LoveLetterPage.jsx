'use client';
import { useState, useEffect } from 'react';

export default function LoveLetterPage({ onClose = () => {} }) {
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

 const letters = [
  "Zoha…",
  "",
  "Okay listen — I know I’m late with this birthday gift.",
  "Late like a slow WiFi connection ruining a romantic moment.",
  "But hey, at least I arrived… looking cute and fully loaded. 😌",
  "",
  "Honestly, your birthday should be illegal.",
  "How can one girl level up in beauty every year?",
  "Patch notes please? I need the changelog. 😏",
  "",
  "I missed the date, but not you.",
  "You’ve been running in my background processes like a stubborn app —",
  "And honestly, I don’t want to close you. Ever.",
  "",
  "Your smile? Yeah… that's my favorite UI.",
  "Your voice? Premium audio experience.",
  "You? Limited edition, no duplicates available.",
  "",
  "I may be a late developer,",
  "But my heart deploys to you instantly. No bugs. No delays.",
  "",
  "So Happy Belated Birthday, Zoha.",
  "I promise next year, I’ll be on time.",
  "Actually… I might even come early — just to see that smile twice. 😉",
  "",
  "— Your Secret Developer 💫"
];


  useEffect(() => {
    let currentIndex = 0;
    let fullText = '';

    const typeText = () => {
      if (currentIndex < letters.length) {
        const line = letters[currentIndex];
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
        }, 30);
      }
    };

    typeText();
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  // Check if text is fully displayed
  const isTextComplete = displayedText.length > 500;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-rose-900/50 via-purple-900/40 to-black/60 backdrop-blur-xl rounded-3xl border-2 border-pink-500/40 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 text-pink-400 hover:text-pink-300 transition text-xl sm:text-2xl md:text-3xl z-10"
        >
          ✕
        </button>

        {/* Decorative header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-pink-300 text-xs sm:text-xs md:text-sm uppercase tracking-widest font-mono mb-2">Secret Letter</p>
          <div className="h-0.5 w-16 sm:w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto"></div>
        </div>

        {/* Letter content */}
        <div className="text-xs sm:text-sm md:text-base text-pink-50 font-light leading-relaxed whitespace-pre-wrap space-y-3 sm:space-y-4 px-2 mb-6">
          {displayedText}
          <span className="animate-pulse">▌</span>
        </div>

        {/* Continue Button - appears when text is complete */}
        {isTextComplete && (
          <div className="flex justify-center pt-4 animate-in fade-in duration-1000">
            <button
              onClick={handleClose}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50"
            >
              Continue 💕
            </button>
          </div>
        )}

        {/* Decorative footer */}
        <div className="absolute bottom-0 right-0 text-8xl opacity-5 pointer-events-none">
          💝
        </div>
        <div className="absolute top-20 left-0 text-8xl opacity-5 pointer-events-none">
          💕
        </div>
      </div>
    </div>
  );
}
