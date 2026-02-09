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

  it('should create a todo category', async () => {
    const id = await db.todoCategories.add({ name: 'Personal', color: '#ff0000' });
    const result = await db.todoCategories.get(id);
    expect(result.name).toBe('Personal');
  });

  it('should create a todo', async () => {
    const id = await db.todos.add({ 
      title: 'Buy Groceries', 
      isCompleted: false, 
      categoryId: null, 
      createdAt: new Date() 
    });
    const result = await db.todos.get(id);
    expect(result.title).toBe('Buy Groceries');
    expect(result.isCompleted).toBe(false);
  });

  it('should create a tag and link it to a note', async () => {
    const tagId = await db.tags.add({ name: 'Urgent', color: '#ff0000' });
    const noteId = await db.notes.add({ 
      title: 'Emergency Note', 
      tagIds: [tagId],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const note = await db.notes.get(noteId);
    expect(note.tagIds).toContain(tagId);

    const notesWithTag = await db.notes.where('tagIds').equals(tagId).toArray();
    expect(notesWithTag.length).toBe(1);
    expect(notesWithTag[0].title).toBe('Emergency Note');
  });
});
