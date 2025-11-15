'use client';
import { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function VerseText({ lines = [], speed = 40, loop = true }) {
  return (
    <div className="verse text-2xl md:text-4xl leading-relaxed">
      <Typewriter
        options={{ loop }}
        onInit={(tw) => {
          lines.forEach((ln, i) => {
            tw.typeString(`<span style=\"color: #7ee7e7\">${ln}</span>`).pauseFor(800);
            if (i !== lines.length - 1) tw.deleteAll();
          });
          if (!loop) tw.stop();
          tw.start();
        }}
      />
    </div>
  );
}
