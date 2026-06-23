/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Chatbox from '../assets/Chatbox';

const CANVAS_W =1920;
const CANVAS_H =1080;

const Ryucchi = ({ onPetClick }) => {
  const PET_WIDTH = 350;
  const PET_HEIGHT = 350;

  const position = { x: CANVAS_W - PET_WIDTH -600, y: CANVAS_H -380 };


  const [activeClickDialogues, setActiveClickDialogues] = useState([]);

  const nextIdRef = useRef(0);
  const timeoutsRef = useRef(new Set());

  const DURATION =1800;

  const clickDialogues =[
    "im so tired bro..", 
    "my eyes.. they burn..", 
    "cant.. stay up anymore..",
    "i wanna sleep..", 
    "i wanna.. sleep forever..", 
    "sleep.. my love..",
    "zzz..", 
    "im up.. i promis-",
  ];

  const handleClick = () =>{
    const text= clickDialogues[Math.floor(Math.random() * clickDialogues.length)];
    const id = nextIdRef.current++;
    const jitter = Math.floor(Math.random() * 30) - 15;
    setActiveClickDialogues(prev => [...prev, { id, text, jitter }]);
    const tid= setTimeout(() => {
      setActiveClickDialogues(prev => prev.filter(d => d.id !== id));
      timeoutsRef.current.delete(tid);
    }, DURATION);
    timeoutsRef.current.add(tid);
    if (onPetClick) onPetClick();
  };

  useEffect(() => () => {
    timeoutsRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="absolute pointer-events-auto select-none"
      style={{ left: position.x, top: position.y, width: PET_WIDTH, height: PET_HEIGHT, zIndex: 100, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <img
        src="./animations/ryucchi/ryu_idle.gif"
        alt="ryu sleeping"
        className="w-full h-full object-contain"
        style={{ imageRendering: 'pixelated', pointerEvents: 'none' }}
        draggable={false}
      />
      <Chatbox
        activeDialogues={activeClickDialogues}
        animationName="kiraClickFloat"
        duration={DURATION}
      />
    </div>
  );
};

export default Ryucchi;