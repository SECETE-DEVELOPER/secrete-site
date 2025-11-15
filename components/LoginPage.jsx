'use client';
import { useState, useEffect } from 'react';

export default function LoginPage({ onSuccess = () => {} }) {
  const [name, setName] = useState('');
  const [answer, setAnswer] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hearts, setHearts] = useState([]);

  const VALID_NAME = 'ZOHA';
  const VALID_ANSWER = 'KISS';
  const SECURITY_QUESTION = 'What special happened on Aug 15, 2024?';

  // Track login attempts in localStorage AND send to server
  const logLoginAttempt = (type, name, answer, success) => {
    try {
      const logs = JSON.parse(localStorage.getItem('login_logs') || '[]');
      const newLog = {
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }),
        attemptType: type,
        name: name ? name.toUpperCase() : 'empty',
        answer: answer ? '***' : 'empty', // Hide the actual answer for security
        success: success,
        ipInfo: 'Browser Local'
      };
      logs.push(newLog);
      localStorage.setItem('login_logs', JSON.stringify(logs));
      
      // Also send to server
      fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLog)
      }).catch(err => console.error('Failed to send log to server:', err));
      
      // Log to console for debugging
      console.log('📝 Login Log:', newLog);
      console.log('📊 Total attempts:', logs.length);
    } catch (e) {
      console.error('Failed to log login attempt:', e);
    }
  };

  // Generate floating hearts
  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 4 + Math.random() * 2,
    }));
    setHearts(newHearts);
  }, []);

  // Generate particles
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['💕', '✨', '💖', '🌹', '💝'][Math.floor(Math.random() * 5)],
      };
      setParticles(prev => [...prev, newParticle].slice(-30));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const nameUpper = name.trim().toUpperCase();
    const answerUpper = answer.trim().toUpperCase();

    // Log attempt immediately
    logLoginAttempt('LOGIN_ATTEMPT', name, answer, false);

    // Simulate loading
    setTimeout(() => {
      if (nameUpper !== VALID_NAME) {
        const errorMsg = '❌ Access Denied! Only ZOHA can access this journey.';
        setError(errorMsg);
        logLoginAttempt('FAILED_NAME', name, answer, false);
        setIsLoading(false);
        return;
      }

      if (answerUpper !== VALID_ANSWER) {
        const errorMsg = '❌ Wrong answer! That\'s not the special moment we shared.';
        setError(errorMsg);
        logLoginAttempt('FAILED_ANSWER', name, answer, false);
        setIsLoading(false);
        return;
      }

      // Success!
      console.log('✅ Login successful! Welcome ZOHA 💕');
      logLoginAttempt('LOGIN_SUCCESS', name, answer, true);
      setError('');
      onSuccess();
      setIsLoading(false);
    }, 1500);
  };

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

      {/* Floating hearts */}
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
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-black/60 backdrop-blur-xl rounded-3xl border-2 border-pink-500/40 p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🔐</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 mb-2">
              Secret Journey
            </h1>
            <p className="text-pink-200/70 text-sm">
              Only for the one who stole my heart 💕
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-pink-500"></div>
            <span className="text-lg">✨</span>
            <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-pink-500"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-pink-200 text-sm font-semibold mb-2">
                👤 Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-lg text-pink-50 placeholder-pink-300/40 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/50 transition-all"
                disabled={isLoading}
                autoComplete="off"
              />
              <p className="text-xs text-pink-300/50 mt-1">
                
              </p>
            </div>

            {/* Security Question */}
            <div className="space-y-2">
              <label className="block text-pink-200 text-sm font-semibold mb-2">
                💭 {SECURITY_QUESTION}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full px-4 py-3 bg-black/40 border border-pink-500/30 rounded-lg text-pink-50 placeholder-pink-300/40 focus:outline-none focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/50 transition-all pr-10"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-300/70 hover:text-pink-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <p className="text-xs text-pink-300/50 mt-1">
                
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-950/40 border border-red-500/50 rounded-lg animate-pulse">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !name.trim() || !answer.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-pink-500/50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span> Unlocking...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🔓 Enter My World
                </span>
              )}
            </button>
          </form>

          {/* Footer message */}
          <div className="mt-8 pt-6 border-t border-pink-500/20 text-center">
            <p className="text-xs text-pink-300/60 font-light">
              This journey is crafted only for The Special Person 💕
            </p>
            <p className="text-xs text-pink-300/50 mt-2">
              "Guards of memories, keepers of hearts"
            </p>
          </div>

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
      `}</style>
    </div>
  );
}
