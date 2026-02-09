import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to handle resizable panels.
 * @param {number} initialWidth - Default width in pixels
 * @param {number} minWidth - Minimum width constraint
 * @param {number} maxWidth - Maximum width constraint
 * @param {string} storageKey - LocalStorage key for persistence
 * @param {function} calculateWidth - Function (clientX) => newWidth. Defaults to clientX.
 */
export const useResizable = (initialWidth, minWidth = 200, maxWidth = 480, storageKey, calculateWidth) => {
  const [width, setWidth] = useState(() => {
    const saved = storageKey ? localStorage.getItem(storageKey) : null;
    return saved ? parseInt(saved, 10) : initialWidth;
  });
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    if (storageKey) {
      localStorage.setItem(storageKey, width);
    }
  }, [width, storageKey]);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;
    
    let newWidth;
    if (calculateWidth) {
      newWidth = calculateWidth(e.clientX);
    } else {
      newWidth = e.clientX;
    }

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
    }
  }, [isResizing, calculateWidth, minWidth, maxWidth]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', stopResizing);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, handleMouseMove, stopResizing]);

  return { width, setWidth, startResizing, isResizing };
};