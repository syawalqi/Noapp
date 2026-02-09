import React, { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState('notes'); // notes, todos, settings
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [unlockedFolderIds, setUnlockedFolderIds] = useState([]);
  const [paperType, setPaperType] = useState(() => {
    return localStorage.getItem('paperType') || 'plain';
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

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
    isFocusMode,
    setIsFocusMode,
    unlockedFolderIds,
    unlockFolder,
    paperType,
    setPaperType,
    theme,
    toggleTheme,
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
