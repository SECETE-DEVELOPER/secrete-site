'use client';
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.3;

    // Log when audio source loads
    const handleCanPlay = () => {
      console.log('✅ Audio file loaded and ready to play');
    };

    const handleLoadStart = () => {
      console.log('📥 Loading audio file...');
    };

    const handleError = (e) => {
      console.error('❌ Audio error:', e.target.error?.message, 'Code:', e.target.error?.code);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);

    // Try to play audio - local file only
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('🎵 Background music started playing');
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('⚠️ Autoplay blocked by browser. Click anywhere to enable audio.', error?.message);
        });
    }

    // Handle play/pause state changes
    const handlePlay = () => {
      console.log('▶️ Music playing');
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log('⏸️ Music paused');
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Allow user to click anywhere to start music if autoplay failed
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        console.log('🖱️ User clicked - attempting to play music');
        audioRef.current.play().catch((err) => console.log('Audio play failed:', err?.message));
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    return () => document.removeEventListener('click', handleUserInteraction);
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      loop
      crossOrigin="anonymous"
    >
      <source src="/Departure Lane(KoshalWorld.Com).mp3" type="audio/mpeg" />
      <source src="https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
