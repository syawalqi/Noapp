import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import React from 'react';
import 'fake-indexeddb/auto';
import { useFolders } from '../hooks/useFolders';
import { useNotes } from '../hooks/useNotes';
import { db } from '../db';
import { UIProvider } from '../context/UIContext';

describe('Custom Hooks', () => {
  const wrapper = ({ children }) => <UIProvider>{children}</UIProvider>;

  beforeEach(async () => {
    await db.folders.clear();
    await db.notes.clear();
    localStorage.clear();
  });

  it('useFolders should add a folder', async () => {
    const { result } = renderHook(() => useFolders(), { wrapper });
    
    let id;
    await act(async () => {
      id = await result.current.addFolder('New Folder');
    });

    const folder = await db.folders.get(id);
    expect(folder.name).toBe('New Folder');
  });

  it('useNotes should filter out notes for locked folders', async () => {
    // 1. Create a locked folder
    const folderId = await db.folders.add({ 
      name: 'Secret', 
      isLocked: true, 
      createdAt: new Date() 
    });
    
    // 2. Add a note to it
    await db.notes.add({ 
      title: 'Hidden Note', 
      folderId, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    });

    // 3. Try to fetch notes with useNotes
    const { result } = renderHook(() => useNotes(folderId), { wrapper });

    // Wait for Dexie query to resolve
    await waitFor(() => {
      expect(result.current.notes).toBeDefined();
    });

    // Result should be empty because it's locked
    expect(result.current.notes.length).toBe(0);
  });
});
