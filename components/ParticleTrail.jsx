'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ParticleTrail() {
  const el = useRef(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const onMove = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const dot = document.createElement('div');
      dot.className = 'w-3 h-3 rounded-full bg-pink-400/80 pointer-events-none absolute';
      dot.style.left = `${x - 6}px`;
      dot.style.top = `${y - 6}px`;
      dot.style.transform = 'scale(0.6)';
      dot.style.opacity = '0.9';
      node.appendChild(dot);
      gsap.to(dot, { x: 0, y: -20, opacity: 0, scale: 1.6, duration: 0.9, onComplete: () => dot.remove() });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return <div ref={el} className="absolute inset-0 z-40 pointer-events-none" />;
}
