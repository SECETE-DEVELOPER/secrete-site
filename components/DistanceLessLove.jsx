'use client';
import { useState, useEffect } from 'react';

export default function DistanceLessLove({ onClose = () => {} }) {
  const [show, setShow] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [hearts, setHearts] = useState([]);

 const poem = [
  "Dooriyan lambi hain… par mera dil tum tak seedha route find kar leta hai.",
  "",
  "Hamare beech miles hain, time zones hain, silence ke gaps hain…",
  "Phir bhi tum meri life ka most active process ho — always running, always present.",
  "",
  "Tum door ho, par strange baat ye hai:",
  "Mera har din tum se hi shuru hota hai, tum par hi end hota hai.",
  "",
  "“Faasle sirf map ke hissaab se bade lagte hain…",
  "Jis dil mein tum rehne lagi ho, wahan koi distance save hi nahi hota.”",
  "",
  "Har raat main wohi stars dekh leta hoon jinke neeche tum hoti ho…",
  "Jaise universe ne hume ek shared sky variable de rakha ho.",
  "",
  "Kabhi kabhi lagta hai tum meri screen pe nahi,",
  "Seedha hardware pe engraved ho — like a permanent feature.",
  "",
  "Distance tough hota hai, no doubt…",
  "Lekin tum? Tum sab kuch easy bana deti ho —",
  "Even the waiting, even the silence, even the time gap.",
  "",
  "Aur sach kahun?",
  "Main sirf tumhare messages ka addict nahi…",
  "Main tumhari presence ka fan hoon.",
  "",
  "Promise ye nahi ki distance khatam kar dunga —",
  "Promise ye hai ki main tum tak pohanchne ke har tareeke ko try karta rahunga.",
  "",
  "Zoha… tum door ho, par kabhi far nahi.",
  "Tum meri duniya ka wo part ho jo kabhi disconnect nahi hota. 💕"
];


  useEffect(() => {
    let currentIndex = 0;
    let fullText = '';

    const typeText = () => {
      if (currentIndex < poem.length) {
        const line = poem[currentIndex];
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
            setTimeout(typeText, 150);
          }
        }, 20);
      }
    };

    typeText();

    // Generate floating hearts
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 5 + Math.random() * 3,
    }));
    setHearts(newHearts);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-950/95 via-rose-950/95 to-purple-950/95 backdrop-blur-lg flex items-center justify-center overflow-hidden p-4">
      
      {/* Starfield background */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
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
          className="absolute text-2xl"
          style={{
            left: `${heart.left}%`,
            bottom: '-30px',
            animation: `floatHeart ${heart.duration}s ease-in infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💕
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-3xl w-full">
        <div className="bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-black/60 backdrop-blur-xl rounded-3xl border-2 border-pink-500/40 p-8 md:p-10 max-h-[85vh] overflow-y-auto shadow-2xl">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 text-pink-400 hover:text-pink-300 transition text-xl sm:text-2xl md:text-3xl z-10"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3 md:mb-4">🌙</div>
            <p className="text-pink-300 text-xs sm:text-xs md:text-sm uppercase tracking-widest font-mono mb-2">
              Across the Distance
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200">
              Still Yours Always
            </h2>
            <div className="h-0.5 w-16 sm:w-20 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-3 sm:mt-4"></div>
          </div>

          {/* Poem content */}
          <div className="text-xs sm:text-sm md:text-base text-pink-50 font-light leading-relaxed whitespace-pre-wrap italic px-2 mb-6">
            {displayedText}
            <span className="animate-pulse">▌</span>
          </div>

          {/* Signature */}
          <div className="text-right mt-6 sm:mt-8 text-pink-300 font-mono text-xs sm:text-xs md:text-sm mb-6">
            — With endless love from across the miles 🌍💕
          </div>

          {/* Continue Button - appears when poem is complete */}
          {displayedText.length > 500 && (
            <div className="flex justify-center animate-in fade-in duration-1000">
              <button
                onClick={handleClose}
                className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-xs sm:text-sm md:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50"
              >
                Continue 💕
              </button>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 text-9xl opacity-5 pointer-events-none">
            💝
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatHeart {
          0% {
            bottom: -30px;
            opacity: 0;
            transform: translateX(0) scale(0.5);
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
            transform: translateX(${Math.random() * 150 - 75}px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
