'use client';
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const hasPlayedOnce = useRef(false);

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Prevent double playback in React Strict Mode
    if (window.__audioPlayerInitialized) {
      console.log('🎵 Audio already initialized, skipping...');
      return;
    }
    window.__audioPlayerInitialized = true;

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

    const handlePlay = () => {
      console.log('▶️ Music playing');
      setIsPlaying(true);
    };

    const handlePause = () => {
      console.log('⏸️ Music paused');
      setIsPlaying(false);
    };

    const handleEnded = () => {
      console.log('⏹️ Music ended - stopping (not replaying)');
      setIsPlaying(false);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    // Try to play audio - local file only, ONCE
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('🎵 Background music started playing (ONCE) - autoplay SUCCESS');
          setIsPlaying(true);
          hasPlayedOnce.current = true;
          setAutoplayFailed(false);
        })
        .catch((error) => {
          console.log('⚠️ Autoplay blocked by browser:', error?.message);
          setAutoplayFailed(true);
        });
    }

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Allow user to click anywhere to start music ONLY if autoplay failed AND hasn't played yet
  useEffect(() => {
    if (!autoplayFailed || hasPlayedOnce.current) {
      return; // Don't add listener if autoplay succeeded or already played
    }

    const handleUserInteraction = () => {
      if (audioRef.current && !hasPlayedOnce.current) {
        console.log('🖱️ User clicked - playing music (autoplay was blocked)');
        audioRef.current.currentTime = 0; // Reset to start
        audioRef.current.play().catch((err) => console.log('Audio play failed:', err?.message));
        hasPlayedOnce.current = true;
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    return () => document.removeEventListener('click', handleUserInteraction);
  }, [autoplayFailed]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
      crossOrigin="anonymous"
    >
      <source src="/Departure Lane(KoshalWorld.Com).mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
