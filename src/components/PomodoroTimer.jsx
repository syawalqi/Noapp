import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Bell } from 'lucide-react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, short, long
  const timerRef = useRef(null);

  const modes = {
    work: { label: 'Work', time: 25, color: 'text-paper-800' },
    short: { label: 'Short Break', time: 5, color: 'text-green-600' },
    long: { label: 'Long Break', time: 15, color: 'text-blue-600' },
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          handleComplete();
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, minutes, seconds]);

  const handleComplete = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    
    // Browser Notification
    if (Notification.permission === 'granted') {
      new Notification('Session Complete!', {
        body: mode === 'work' ? 'Time for a break!' : 'Ready to focus again?',
        icon: '/vite.svg'
      });
    }
    
    // Simple beep sound
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
  };

  const toggleTimer = () => {
    if (!isActive && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(modes[mode].time);
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setMinutes(modes[newMode].time);
    setSeconds(0);
  };

  const progress = ((modes[mode].time * 60 - (minutes * 60 + seconds)) / (modes[mode].time * 60)) * 100;

  return (
    <div className="papery-card p-8 flex flex-col items-center max-w-sm mx-auto w-full">
      <div className="flex space-x-2 mb-8 bg-paper-100 p-1 rounded-sm border border-paper-200 w-full">
        {Object.entries(modes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            className={`flex-1 text-[10px] uppercase font-bold tracking-tighter py-2 rounded-sm transition-all ${
              mode === key ? 'bg-paper-50 shadow-sm text-paper-900' : 'text-paper-400 hover:text-paper-600'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        {/* Simple Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96" cy="96" r="88"
            className="fill-none stroke-paper-100"
            strokeWidth="4"
          />
          <circle
            cx="96" cy="96" r="88"
            className={`fill-none transition-all duration-1000 ${modes[mode].color}`}
            strokeWidth="4"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="text-5xl font-serif font-bold text-paper-900 tracking-tight">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-paper-800 text-paper-50 shadow-md hover:bg-paper-900 transition-colors"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        <button
          onClick={resetTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-paper-300 text-paper-600 hover:bg-paper-100 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
