import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { UIProvider, useUI } from '../context/UIContext';

describe('UIContext', () => {
  const wrapper = ({ children }) => <UIProvider>{children}</UIProvider>;

  it('should provide default values', () => {
    const { result } = renderHook(() => useUI(), { wrapper });
    expect(result.current.activeModule).toBe('notes');
    expect(result.current.isFocusMode).toBe(false);
    expect(result.current.theme).toBe('light');
  });

  it('should toggle theme', () => {
    const { result } = renderHook(() => useUI(), { wrapper });
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should change active module', () => {
    const { result } = renderHook(() => useUI(), { wrapper });
    
    act(() => {
      result.current.setActiveModule('todos');
    });
    
    expect(result.current.activeModule).toBe('todos');
  });
});
