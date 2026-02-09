import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import 'fake-indexeddb/auto';
import { useFolders } from '../hooks/useFolders';
import { useNotes } from '../hooks/useNotes';
import { db } from '../db';

describe('Custom Hooks', () => {
  beforeEach(async () => {
    await db.folders.clear();
    await db.notes.clear();
  });

  it('useFolders should add a folder', async () => {
    const { result } = renderHook(() => useFolders());
    
    let id;
    await act(async () => {
      id = await result.current.addFolder('New Folder');
    });

    const folder = await db.folders.get(id);
    expect(folder.name).toBe('New Folder');
  });

  it('useNotes should add a note', async () => {
    const { result } = renderHook(() => useNotes());
    
    let id;
    await act(async () => {
      id = await result.current.addNote('New Note', 'Content', 1);
    });

    const note = await db.notes.get(id);
    expect(note.title).toBe('New Note');
    expect(note.folderId).toBe(1);
  });
});
