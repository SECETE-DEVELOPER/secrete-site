'use client';
import { useState, useEffect } from 'react';

export default function ZOHUMessage({ onClose = () => {} }) {
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  const messages = [
    "Dear ZOHU,",
    "",
    "Happy Late Birthday! 🎂",
    "",
    "I know I'm late to the party, but I've been busy crafting something special just for you.",
    "",
    "Every node in this experience represents a thought:",
    "• How to make you smile 💕",
    "• How special you truly are 💜",
    "• How much you deserve to feel loved 💝",
    "• How the world is better with you 🌟",
    "• And how you inspire me every single day ✨",
    "",
    "Complete all 5 tasks and unlock a secret message from me.",
    "",
    "— Your Secret Developer ❤️",
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentChar = 0;
    let currentMessage = '';

    const timer = setInterval(() => {
      if (currentIndex < messages.length) {
        const message = messages[currentIndex];
        
        if (currentChar < message.length) {
          currentMessage += message[currentChar];
          currentChar++;
          setDisplayedText(displayedText + message[currentChar - 1]);
        } else {
          currentIndex++;
          currentChar = 0;
          currentMessage = '';
          setDisplayedText(prev => prev + '\n');
        }
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-black/60 backdrop-blur-md rounded-2xl border border-pink-500/30 max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-pink-400 hover:text-pink-300 transition text-2xl"
        >
          ✕
        </button>

        {/* Message content */}
        <div className="space-y-4">
          <div className="text-sm text-pink-300 font-mono leading-relaxed whitespace-pre-wrap">
            {displayedText}
            <span className="animate-pulse">▌</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 text-6xl opacity-10 pointer-events-none">
          💕
        </div>
      </div>
    </div>
  );
}
