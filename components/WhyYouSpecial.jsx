'use client';
import { useState, useEffect } from 'react';

export default function WhyYouSpecial({ onClose = () => {} }) {
  const [show, setShow] = useState(true);
  const [displayedReasons, setDisplayedReasons] = useState([]);

  const reasons = [
    {
      emoji: '👀',
      title: 'Your Eyes',
      text: 'Teri aankhein… jaise meri puri duniya ka default theme change ho jaye.',
    },
    {
      emoji: '💫',
      title: 'Your Hair',
      text: 'Teri zulfen bilkul 3D animation jaise — soft, smooth, unreal.',
    },
    {
      emoji: '😊',
      title: 'Your Smile',
      text: 'Teri smile mein woh bug-fixer power hai jo mujhe har din restart kar deta hai.',
    },
    {
      emoji: '🌹',
      title: 'Your Beauty',
      text: 'Sach bolun? Teri beauty aisi hai jo bina brain ke bhi full CPU le leti hai — bas stun, no logic, just wow.',
    },
    {
      emoji: '❤️',
      title: 'Just You',
      text: 'Aur sab se upar… tu. Features alag alag cute hain, par jo cheez dil ko lagti hai — wo sirf tu hai, poori ki poori.',
    },
  ];

  useEffect(() => {
    const timers = reasons.map((reason, index) =>
      setTimeout(
        () => setDisplayedReasons(prev => [...prev, reason]),
        index * 800
      )
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleClose = () => {
    console.log('✅ BUTTON CLICKED - Setting show to false');
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <>
      {/* Modal with content */}
      <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-gradient-to-br from-rose-900/50 via-purple-900/40 to-black/60 backdrop-blur-xl rounded-3xl border-2 border-pink-500/40 max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 shadow-2xl pointer-events-auto">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 text-pink-400 hover:text-pink-300 transition text-xl sm:text-2xl md:text-3xl z-10"
          >
            ✕
          </button>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-pink-300 text-xs sm:text-xs md:text-sm uppercase tracking-widest font-mono mb-2">Why You're Absolutely Special</p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200">
              5 Reasons I Adore You
            </h2>
            <div className="h-0.5 w-20 sm:w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto mt-3 sm:mt-4"></div>
          </div>

          {/* Reasons grid */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5">
            {displayedReasons.map((reason, index) => (
              <div
                key={index}
                className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-900/30 to-purple-900/30 border border-pink-500/20 hover:border-pink-500/40 transition-all transform hover:scale-105 animate-in fade-in-up duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{reason.emoji}</div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-pink-200 mb-1 sm:mb-2">{reason.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-pink-50/80 font-light leading-relaxed">{reason.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing message */}
          <div className="mt-8 sm:mt-10 md:mt-12 text-center px-2">
            <p className="text-pink-300 font-light text-sm sm:text-base md:text-lg leading-relaxed">
              And every single day, I discover new reasons to love you more. 💕
            </p>
            <p className="text-purple-300 text-xs sm:text-xs md:text-sm mt-3 sm:mt-4 font-mono">
              — Your Secret Developer
            </p>

            {/* Debug: Show button state if needed */}
            {displayedReasons.length < reasons.length && (
              <div className="text-xs text-pink-300/50 mt-4">
                Loading reasons... {displayedReasons.length}/{reasons.length}
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 text-9xl opacity-5 pointer-events-none">
            💝
          </div>
        </div>
      </div>

      {/* Button OUTSIDE the modal - on top layer */}
      {displayedReasons.length === reasons.length && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-4 sm:pb-8 pointer-events-none">
          <button
            onClick={() => {
              console.log('✅ Continue button clicked - moving to next page');
              handleClose();
            }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold text-sm sm:text-base rounded-full transition-all transform hover:scale-110 shadow-2xl cursor-pointer pointer-events-auto mx-2"
            style={{ touchAction: 'manipulation' }}
          >
            Continue 💕
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
