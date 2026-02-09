import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../db';

describe('Database Schema', () => {
  beforeEach(async () => {
    await db.folders.clear();
    await db.notes.clear();
  });

  it('should create a folder', async () => {
    const folder = {
      name: 'Test Folder',
      parentId: null,
      isLocked: false,
      createdAt: new Date()
    };
    const id = await db.folders.add(folder);
    const result = await db.folders.get(id);
    expect(result.name).toBe('Test Folder');
  });

  it('should create a note in a folder', async () => {
    const folderId = await db.folders.add({ name: 'Work', parentId: null, isLocked: false, createdAt: new Date() });
    const note = {
      title: 'Meeting Notes',
      content: 'Discussion about project X',
      folderId: folderId,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const noteId = await db.notes.add(note);
    const result = await db.notes.get(noteId);
    expect(result.title).toBe('Meeting Notes');
    expect(result.folderId).toBe(folderId);
  });
});
