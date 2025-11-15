import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * useMusic — React hook for YouTube IFrame audio control
 * Exposes: play(), pause(), setVolume(), fadeTo(volume, duration)
 */
export function useMusic() {
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const volumeRef = useRef(1);
  const fadeTimelineRef = useRef(null);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Prevent double initialization in strict mode
    if (window.__youtubePlayerInitialized) {
      console.log('🎵 useMusic already initialized, skipping...');
      setIsReady(true);
      return;
    }

    console.log('🎵 useMusic initializing...');

    // Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      console.log('📥 Loading YouTube IFrame API...');
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Wait for YT to load, then create player
    const checkYT = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkYT);
        console.log('✅ YouTube API loaded successfully');

        // Check if player container exists
        const playerDiv = document.getElementById('youtube-audio-player');
        if (!playerDiv) {
          console.error('❌ youtube-audio-player div not found!');
          return;
        }

        // Only create player once
        if (!playerRef.current || !playerRef.current.getVideoData) {
          window.__youtubePlayerInitialized = true;
          try {
            console.log('🎬 Creating YouTube player...');
            playerRef.current = new window.YT.Player('youtube-audio-player', {
              videoId: 'dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up (embeddable)
              width: 0,
              height: 0,
              playerVars: {
                autoplay: 0,
                controls: 0,
                loop: 1,
                playlist: 'dQw4w9WgXcQ',
                rel: 0,
                modestbranding: 1,
                fs: 0,
                iv_load_policy: 3,
                enablejsapi: 1
              },
              events: {
                onReady: () => {
                  console.log('✅ YouTube player ready (not autoplaying - using local audio)');
                  setIsReady(true);
                },
                onStateChange: (event) => {
                  // 1 = PLAYING, 0 = ENDED, 2 = PAUSED, 3 = BUFFERING, 5 = CUED
                  const stateNames = {0: 'ENDED', 1: 'PLAYING', 2: 'PAUSED', 3: 'BUFFERING', 5: 'CUED'};
                  console.log('🎵 Player state:', stateNames[event.data]);
                  setIsPlaying(event.data === 1);
                },
                onError: (error) => {
                  console.error('❌ YouTube player error:', error.data, 'Error codes: 2=invalid ID, 5=HTML5 player error, 100=video not found, 101=video not allowed');
                }
              }
            });
          } catch (e) {
            console.error('Failed to create YouTube player:', e);
          }
        }
      }
    }, 100);

    return () => clearInterval(checkYT);
  }, []);

  // Play
  const play = useCallback(async () => {
    if (!playerRef.current) {
      console.log('❌ Player ref is null');
      return;
    }
    if (!isReady) {
      console.log('❌ Player not ready yet');
      return;
    }
    if (!playerRef.current.playVideo) {
      console.log('❌ playVideo method not available');
      return;
    }

    try {
      console.log('▶️ Attempting to play music...');
      playerRef.current.playVideo();
      setIsPlaying(true);
      console.log('✅ Music started playing');
    } catch (e) {
      console.error('❌ Could not play audio:', e);
    }
  }, [isReady]);

  // Pause
  const pause = useCallback(() => {
    if (playerRef.current && isReady && playerRef.current.pauseVideo) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }
  }, [isReady]);

  // Set volume (0-100)
  const setVolume = useCallback(
    (vol) => {
      const clampedVol = Math.max(0, Math.min(100, vol));
      volumeRef.current = clampedVol;
      if (playerRef.current && isReady && playerRef.current.setVolume) {
        playerRef.current.setVolume(clampedVol);
      }
    },
    [isReady]
  );

  // Fade to volume over duration (ms)
  const fadeTo = useCallback(
    (targetVol, duration = 1000) => {
      if (fadeTimelineRef.current) {
        fadeTimelineRef.current.kill();
      }

      const obj = { vol: volumeRef.current };
      fadeTimelineRef.current = gsap.to(obj, {
        vol: targetVol,
        duration: duration / 1000,
        ease: 'power2.inOut',
        onUpdate: () => {
          setVolume(obj.vol);
        }
      });
    },
    [setVolume]
  );

  return {
    play,
    pause,
    setVolume,
    fadeTo,
    isReady,
    isPlaying
  };
}
