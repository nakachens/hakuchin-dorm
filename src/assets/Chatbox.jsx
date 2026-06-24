/* eslint-disable no-unused-vars */
import React from 'react';

const Chatbox = ({
  activeDialogues = [],
  dragDialogue = '',
  isDragging = false,
  animationName = 'petClickFloat',
  duration = 1800,
}) => (
  <>
    <style>{`
      @keyframes ${animationName} {
        0%   { opacity: 0; transform: translate(calc(-50% + var(--jx, 0px)),   0px) scale(0.9);  }
        15%  { opacity: 1; transform: translate(calc(-50% + var(--jx, 0px)),  -8px) scale(1);    }
        70%  { opacity: 1; transform: translate(calc(-50% + var(--jx, 0px)), -32px) scale(1);    }
        100% { opacity: 0; transform: translate(calc(-50% + var(--jx, 0px)), -48px) scale(0.95); }
      }
    `}</style>

    {/* click bubbles; each one floats and fades independently */}
    {activeDialogues.map((d) => (
      <div
        key={d.id}
        className="absolute left-1/2 border-2 px-2 py-1 rounded-md text-2xl bg-amber-50 font-bold"
        style={{
          top: '-15px',
          borderColor: '#9b9b9b',
          color: '#363636',
          fontFamily: 'cursive',
          whiteSpace: 'pre',
          padding:'8px',
          zIndex: 101,
          pointerEvents: 'none',
          '--jx': `${d.jitter}px`,
          animation: `${animationName} ${duration}ms ease-out forwards`,
        }}
      >
        {d.text}
      </div>
    ))}

    {/* drag bubble */}
    {isDragging && dragDialogue && (
      <div
        className="absolute left-1/2 transform -translate-x-1/2 border-2 bg-white rounded-md text-2xl font-bold"
        style={{
          top: '-15px',
          borderColor: '#9b9b9b',
          color: '#363636',
          fontFamily: 'cursive',
          whiteSpace: 'nowrap',
          zIndex: 101,
          padding: '8px',
        }}
      >
        {dragDialogue}
      </div>
    )}
  </>
);

export default Chatbox;
