/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Chatbox from '../assets/Chatbox';

const CANVAS_W = 1920;
const CANVAS_H = 1080;

const Miru = ({ onPetClick, scale = 1 }) => {
  const PET_WIDTH  = 320;
  const PET_HEIGHT = 320;

  const SPAWN_X = CANVAS_W - PET_WIDTH - 200;
  const SPAWN_Y = CANVAS_H - 950;

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
    "oh..",
    "easy dear..",
    "im too tired for this..",
    "drop me at kira's im hungry",
    "what now..",
    "what a view..",
    "im a bird..",
    "triple T save me..",
  ];

  const clickDialogues = [
    "whats up?",
    "do you want something?",
    "have you seen this show?",
    "tung tung tung sahur..",
    "yeah?",
    "is monta crying again?",
    "dont poke me too much man",
    "rest in peace my granny \n she got hit by a bazooka..",
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
        src={isDragging ? './animations/miru/miru_hold.png' : './animations/miru/miru_idle.gif'}
        alt="Miru"
        className="w-full h-full object-contain"
        style={{ imageRendering: 'pixelated', pointerEvents: 'none' }}
        draggable={false}
      />
      <Chatbox
        activeDialogues={activeClickDialogues}
        dragDialogue={currentDragDialogue}
        isDragging={isDragging}
        animationName="miruClickFloat"
        duration={DURATION}
      />
    </div>
  );
};

export default Miru;