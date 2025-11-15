'use client';
import { useEffect } from 'react';

/**
 * YouTubePlayer — Renders a hidden YouTube IFrame for audio playback
 * This component mounts the player that useMusic hook controls.
 */
export default function YouTubePlayer() {
  useEffect(() => {
    // Ensure the player container exists
    const container = document.getElementById('youtube-player-container');
    if (!container) {
      const div = document.createElement('div');
      div.id = 'youtube-player-container';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      tag.defer = true;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div
      id="youtube-player-container"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        zIndex: -1,
        opacity: 0,
        pointerEvents: 'none'
      }}
    >
      <div id="youtube-audio-player" style={{ width: '0px', height: '0px' }} />
    </div>
  );
}
