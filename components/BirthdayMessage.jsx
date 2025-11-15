'use client';
import { useState, useEffect } from 'react';

export default function BirthdayMessage({ onClose = () => {} }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="text-6xl animate-bounce">🧸</div>
        <div className="text-5xl animate-pulse">💝</div>
        <div className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🧸</div>
        
        <div className="text-2xl font-bold text-pink-400 animate-pulse">
          Happy Late Birthday! 🎂✨
        </div>
        
        <p className="text-cyan-300 font-mono text-sm max-w-xs mx-auto">
          A digital gift from a developer who cares 💻❤️
        </p>
        
        <p className="text-purple-300 text-xs">
          Click the hearts in the 5 nodes to complete all tasks 💕
        </p>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in;
        }
      `}</style>
    </div>
  );
}
