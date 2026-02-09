import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useUI } from '../context/UIContext';

const PomodoroTimer = () => {
  const {
    timerMode,
    timerMinutes,
    timerSeconds,
    timerIsActive,
    timerModes,
    toggleTimer,
    resetTimer,
    switchTimerMode
  } = useUI();

  const modeData = timerModes[timerMode];
  const progress = ((modeData.time * 60 - (timerMinutes * 60 + timerSeconds)) / (modeData.time * 60)) * 100;

  return (
    <div className="papery-card p-8 flex flex-col items-center max-w-sm mx-auto w-full">
      <div className="flex space-x-2 mb-8 bg-paper-100 p-1 rounded-sm border border-paper-200 w-full">
        {Object.entries(timerModes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => switchTimerMode(key)}
            className={`flex-1 text-[10px] uppercase font-bold tracking-tighter py-2 rounded-sm transition-all ${
              timerMode === key ? 'bg-paper-50 shadow-sm text-paper-900' : 'text-paper-400 hover:text-paper-600'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96" cy="96" r="88"
            className="fill-none stroke-paper-100"
            strokeWidth="4"
          />
          <circle
            cx="96" cy="96" r="88"
            className={`fill-none transition-all duration-1000 ${modeData.color}`}
            strokeWidth="4"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="text-5xl font-serif font-bold text-paper-900 tracking-tight">
          {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-paper-800 text-paper-50 shadow-md hover:bg-paper-900 transition-colors"
        >
          {timerIsActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
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