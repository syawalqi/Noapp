import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState('notes'); // notes, todos, settings
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [activeTodoView, setActiveTodoView] = useState('list'); // list, timer
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusTodoId, setFocusTodoId] = useState(null);
  const [unlockedFolderIds, setUnlockedFolderIds] = useState([]);
  const [paperType, setPaperType] = useState(() => {
    return localStorage.getItem('paperType') || 'plain';
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // --- Persistent Timer State ---
  const [timerMode, setTimerMode] = useState('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Total seconds remaining
  const [timerIsActive, setTimerIsActive] = useState(false);
  const timerIntervalRef = useRef(null);

  const timerModes = {
    work: { label: 'Work', time: 25, color: 'text-paper-800' },
    short: { label: 'Short Break', time: 5, color: 'text-green-600' },
    long: { label: 'Long Break', time: 15, color: 'text-blue-600' },
  };

  // Convert seconds to displayable minutes/seconds
  const timerMinutes = Math.floor(timeLeft / 60);
  const timerSeconds = timeLeft % 60;

  useEffect(() => {
    if (timerIsActive) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timerIsActive]);

  const handleTimerComplete = () => {
    setTimerIsActive(false);
    clearInterval(timerIntervalRef.current);
    
    if (Notification.permission === 'granted') {
      new Notification('Session Complete!', {
        body: timerMode === 'work' ? 'Time for a break!' : 'Ready to focus again?',
        icon: '/vite.svg'
      });
    }
    
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      oscillator.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.warn("Audio alert failed", e);
    }
  };

  const toggleTimer = () => {
    if (!timerIsActive && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setTimerIsActive(!timerIsActive);
  };

  const resetTimer = () => {
    setTimerIsActive(false);
    setTimeLeft(timerModes[timerMode].time * 60);
  };

  const switchTimerMode = (newMode) => {
    setTimerIsActive(false);
    setTimerMode(newMode);
    setTimeLeft(timerModes[newMode].time * 60);
  };

  // --- Persistence and Effects ---
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('paperType', paperType);
  }, [paperType]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const unlockFolder = (folderId) => {
    setUnlockedFolderIds((prev) => [...prev, folderId]);
  };

  const value = {
    activeModule,
    setActiveModule,
    activeFolderId,
    setActiveFolderId,
    activeNoteId,
    setActiveNoteId,
    activeTodoView,
    setActiveTodoView,
    isFocusMode,
    setIsFocusMode,
    focusTodoId,
    setFocusTodoId,
    unlockedFolderIds,
    unlockFolder,
    paperType,
    setPaperType,
    theme,
    toggleTheme,
    // Timer exports
    timerMode,
    timerMinutes,
    timerSeconds,
    timerIsActive,
    timerModes,
    toggleTimer,
    resetTimer,
    switchTimerMode
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
