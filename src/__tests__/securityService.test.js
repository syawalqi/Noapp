import { describe, it, expect, beforeEach } from 'vitest';
import 'fake-indexeddb/auto';
import { db } from '../db';
import { lockFolder, verifyFolderPassword, isFolderLocked } from '../services/securityService';

describe('Security Service', () => {
  let folderId;

  beforeEach(async () => {
    await db.folders.clear();
    folderId = await db.folders.add({
      name: 'Secret Folder',
      parentId: null,
      isLocked: false,
      createdAt: new Date()
    });
  });

  it('should lock a folder with a password', async () => {
    await lockFolder(folderId, 'secret123');
    const folder = await db.folders.get(folderId);
    expect(folder.isLocked).toBe(true);
    expect(folder.passwordHash).toBeDefined();
    expect(folder.salt).toBeDefined();
  });

  it('should verify correct folder password', async () => {
    await lockFolder(folderId, 'secret123');
    const isValid = await verifyFolderPassword(folderId, 'secret123');
    expect(isValid).toBe(true);
  });

  it('should reject incorrect folder password', async () => {
    await lockFolder(folderId, 'secret123');
    const isValid = await verifyFolderPassword(folderId, 'wrong');
    expect(isValid).toBe(false);
  });

  it('should identify a locked folder', async () => {
    expect(await isFolderLocked(folderId)).toBe(false);
    await lockFolder(folderId, 'secret123');
    expect(await isFolderLocked(folderId)).toBe(true);
  });
});
