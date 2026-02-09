import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../db';
import { exportData, importData } from '../services/dataService';

describe('Data Service', () => {
  beforeEach(async () => {
    await db.folders.clear();
    await db.notes.clear();
  });

  it('should export all database content', async () => {
    await db.folders.add({ name: 'Work', isLocked: false, createdAt: new Date() });
    await db.notes.add({ title: 'Note 1', content: 'Test', folderId: 1, createdAt: new Date(), updatedAt: new Date() });

    const result = await exportData();
    expect(result.data.folders.length).toBe(1);
    expect(result.data.notes.length).toBe(1);
    expect(result.data.folders[0].name).toBe('Work');
  });

  it('should import data and clear existing', async () => {
    // 1. Initial State
    await db.folders.add({ name: 'Old Folder', isLocked: false, createdAt: new Date() });

    // 2. Data to import
    const importObj = {
      data: {
        folders: [{ id: 10, name: 'New Folder', isLocked: false, createdAt: new Date() }],
        notes: [{ id: 20, title: 'New Note', content: 'Test', folderId: 10, createdAt: new Date(), updatedAt: new Date() }]
      }
    };

    // 3. Import
    await importData(importObj);

    // 4. Verify
    const folders = await db.folders.toArray();
    const notes = await db.notes.toArray();
    expect(folders.length).toBe(1);
    expect(folders[0].name).toBe('New Folder');
    expect(notes.length).toBe(1);
  });

  it('should throw error for invalid backup format', async () => {
    const invalidObj = { foo: 'bar' };
    await expect(importData(invalidObj)).rejects.toThrow('Invalid backup file format');
  });
});
