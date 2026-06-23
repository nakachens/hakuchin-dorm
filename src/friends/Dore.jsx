/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Chatbox from '../assets/Chatbox';

const CANVAS_W = 1920;
const CANVAS_H = 1080;

const Dore = ({ onPetClick, scale = 1 }) => {
  const PET_WIDTH  = 350;
  const PET_HEIGHT = 350;

  const SPAWN_X = 600;
  const SPAWN_Y = CANVAS_H - 800;

  const [position, setPosition] = useState({ x: SPAWN_X, y: SPAWN_Y });
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragDialogue, setCurrentDragDialogue] = useState('');
  const [activeClickDialogues, setActiveClickDialogues] = useState([]);

  const petRef = useRef(null);
  const nextIdRef = useRef(0);
  const timeoutsRef = useRef(new Set());
  const dragMovedRef = useRef(false);

  const DURATION = 1800;

  const dragDialogues = [
    "WEEE im a bird",
    "LETS GOOOOOOO",
    "drop me at monta's pleaseee~",
    "SO FUN AHAHAHAA",
    "lets peek at everyone~",
    "I CAN SEE MIRU-CHAN",
    "WAHAHAHAHAHA"
  ];

  const clickDialogues = [
    "squish squish", 
    "so cute...", 
    "i want to eat you..",
    "my personal mochi~", 
    "my good boy..", 
    "do you like it pompom..",
    "aww youre so cute~", 
    "oh my dear~",
  ];

  const addClickDialogue = () => {
    const text = clickDialogues[Math.floor(Math.random() * clickDialogues.length)];
    const id = nextIdRef.current++;
    const jitter = Math.floor(Math.random() * 30) - 15;
    setActiveClickDialogues(prev => [...prev, { id, text, jitter }]);
    const tid = setTimeout(() => {
      setActiveClickDialogues(prev => prev.filter(d => d.id !== id));
      timeoutsRef.current.delete(tid);
    }, DURATION);
    timeoutsRef.current.add(tid);
    if (onPetClick) onPetClick();
  };

  const handleMouseDown = (e) => {
    dragMovedRef.current = false;
    setCurrentDragDialogue(dragDialogues[Math.floor(Math.random() * dragDialogues.length)]);

    const startMouse = { x: e.clientX, y: e.clientY };
    const startPos = { x: position.x, y: position.y };

    const handleMouseMove = (e) => {
      const rawDx = e.clientX - startMouse.x;
      const rawDy = e.clientY - startMouse.y;
      if (Math.sqrt(rawDx * rawDx + rawDy * rawDy) < 5) return;
      dragMovedRef.current = true;
      setIsDragging(true);
      const dx = rawDx / scale;
      const dy = rawDy / scale;
      setPosition({
        x: Math.max(25, Math.min(CANVAS_W - PET_WIDTH - 25, startPos.x + dx)),
        y: Math.max(0,  Math.min(CANVAS_H - PET_HEIGHT,     startPos.y + dy)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      if (!dragMovedRef.current) addClickDialogue();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => () => {
    timeoutsRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div
      ref={petRef}
      className="absolute pointer-events-auto select-none"
      style={{ left: position.x, top: position.y, width: PET_WIDTH, height: PET_HEIGHT, zIndex: 100, cursor: isDragging ? 'grabbing' : 'pointer' }}
      onMouseDown={handleMouseDown}
      onDragStart={(e) => e.preventDefault()}
    >
      <img
        src={isDragging ? './animations/dore/dore_hold.png' : './animations/dore/dore_idle.gif'}
        alt="Dore"
        className="w-full h-full object-contain"
        style={{ imageRendering: 'pixelated', pointerEvents: 'none' }}
        draggable={false}
      />
      <Chatbox
        activeDialogues={activeClickDialogues}
        dragDialogue={currentDragDialogue}
        isDragging={isDragging}
        animationName="doreClickFloat"
        duration={DURATION}
      />
    </div>
  );
};

export default Dore;