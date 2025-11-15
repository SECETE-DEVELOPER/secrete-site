'use client';
import { useState, useEffect } from 'react';

export default function MessageNotification({ message, sender, onClose }) {
  useEffect(() => {
    // Play notification sound
    const playSound = async () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Play a pleasant notification tone
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (e) {
        console.log('Could not play notification sound:', e);
      }
    };

    playSound();

    // Auto-close after 5 seconds
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-top">
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-xl p-4 shadow-2xl border border-pink-300/50 max-w-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl animate-bounce">💬</span>
          <div>
            <p className="text-white font-bold text-sm">New Message from {sender}</p>
            <p className="text-pink-100 text-xs mt-1 line-clamp-2">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-pink-100 transition-colors text-lg ml-auto flex-shrink-0"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
