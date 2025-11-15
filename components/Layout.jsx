'use client';
import { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';

export default function Layout({ children }) {
  const [time, setTime] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen min-h-screen bg-gradient-to-b from-[#020214] to-[#090f24] text-cyan-200 font-mono">
      {/* HTML5 Audio Player - Local audio file */}
      <AudioPlayer />

      {/* HUD: Top-right corner */}
      <div className="fixed top-4 right-4 z-50 text-xs md:text-sm font-mono p-3 bg-black/40 border border-cyan-300/30 rounded backdrop-blur-sm space-y-1">
        <div className="text-cyan-300">[distance != 0]</div>
        <div className="text-pink-300">[heart.process = running]</div>
        <div className="text-cyan-400/70">[lastContact = undefined]</div>
        <div className="text-cyan-300/50 pt-2 border-t border-cyan-300/20">{mounted ? time : ''}</div>
      </div>

      {/* Main content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
