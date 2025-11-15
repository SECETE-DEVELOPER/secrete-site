'use client';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function InteractiveWelcome({ show = true }) {
  const [hearts, setHearts] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!show) return;

    // Generate floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
      emoji: ['💕', '✨', '💖', '🌹', '💝'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);

    // Trigger confetti-like hearts
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        x: Math.random() * 100,
        duration: 2 + Math.random() * 1,
      };
      setHearts(prev => [...prev, newHeart].slice(-15));
    }, 300);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float-up ${particle.duration}s ease-out forwards`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Falling hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-3xl"
          style={{
            left: `${heart.x}%`,
            top: '-50px',
            animation: `fall ${heart.duration}s ease-in forwards`,
          }}
        >
          💕
        </div>
      ))}

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
