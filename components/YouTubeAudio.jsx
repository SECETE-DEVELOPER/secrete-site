'use client';
import { useEffect, useRef } from 'react';

export default function YouTubeAudio() {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (typeof window === 'undefined') return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('roo_hi_player', {
        videoId: 'pJPnooVS7Ls',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: 'pJPnooVS7Ls',
          rel: 0,
          modestbranding: 1
        },
        events: {
          onStateChange: (e) => {
            // e.data === 1 means playing
            document.documentElement.dataset.bgAudioPlaying = e.data === 1 ? '1' : '0';
          }
        }
      });
    };

    // cleanup is minimal because YT API manages player
    return () => {
      try {
        if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
      } catch (e) {}
    };
  }, []);

  return (
   <iframe
  id="roo_hi_player"
  title="background-audio"
  src="https://www.youtube.com/embed/bXISlqXpTi8?enablejsapi=1&autoplay=1&loop=1&controls=0&playlist=bXISlqXpTi8&rel=0"
  className="absolute w-0 h-0 opacity-0 pointer-events-none"
  allow="autoplay; encrypted-media"
></iframe>

  );
}
