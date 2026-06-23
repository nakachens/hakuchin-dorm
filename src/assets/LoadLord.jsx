/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';

const IMAGE_ASSETS = [
  // backgrounds
  '/animations/bg/doodles.gif',
  // panel pages
  '/animations/bg/panel/page1.gif',
  '/animations/bg/panel/page2.gif',
  '/animations/bg/panel/page3.gif',
  // buttons
  '/mute.gif',
  '/unmute.gif',
  '/read.gif',
  '/next.gif',
  '/back.gif',
  // characters — idle + hold
  '/animations/monta/monta_idle.gif',
  '/animations/monta/monta_hold.png',
  '/animations/miru/miru_idle.gif',
  '/animations/miru/miru_hold.png',
  '/animations/dore/dore_idle.gif',
  '/animations/dore/dore_hold.png',
  '/animations/ren/ren_idle.gif',
  '/animations/ren/ren_hold.png',
  '/animations/kira/kira_idle.gif',
  '/animations/ryucchi/ryu_idle.gif',
];

const AUDIO_ASSETS = [
  '/music/Strawberry.mp3',
  '/music/click.mp3',
];

const TOTAL = IMAGE_ASSETS.length + AUDIO_ASSETS.length;

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLoadLord() {
  const [loaded, setLoaded] = useState(0);
  const [done, setDone]     = useState(false);

  useEffect(() => {
    let count = 0;
    const tick = () => {
      count += 1;
      setLoaded(count);
      if (count >= TOTAL) setDone(true);
    };

    // Images / GIFs
    IMAGE_ASSETS.forEach(src => {
      const img = new Image();
      img.onload  = tick;
      img.onerror = tick; // still count failed assets so we never hang
      img.src     = src;
    });

    // Audio — load enough to play without buffering
    AUDIO_ASSETS.forEach(src => {
      const audio = new Audio();
      audio.oncanplaythrough = tick;
      audio.onerror          = tick;
      audio.src              = src;
      audio.load();
    });
  }, []);

  return { loaded, total: TOTAL, done };
}

// ─── Loading screen component ─────────────────────────────────────────────────
export default function LoadLord({ loaded, total }) {
  const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#fffbeb', // amber-50
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Track */}
      <div style={{
        width: 320,
        height: 18,
        background: '#fff',
        border: '3px solid #000',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        {/* Fill */}
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: '#000',
          transition: 'width 0.15s ease',
        }} />
      </div>

      {/* Percentage label */}
      <p style={{
        marginTop: 12,
        fontFamily: 'monospace',
        fontSize: 13,
        color: '#000',
        letterSpacing: '0.05em',
      }}>
        {pct}%
      </p>
    </div>
  );
}