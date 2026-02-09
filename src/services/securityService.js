import { db } from '../db';
import { hashPassword, verifyPassword } from '../utils/crypto';

/**
 * Locks a folder with a password.
 */
export const lockFolder = async (folderId, password) => {
  const { salt, hash } = await hashPassword(password);
  return await db.folders.update(folderId, {
    isLocked: true,
    passwordHash: hash,
    salt: salt,
  });
};

/**
 * Verifies if the provided password is correct for the folder.
 */
export const verifyFolderPassword = async (folderId, password) => {
  const folder = await db.folders.get(folderId);
  if (!folder || !folder.isLocked) return true;
  
  return await verifyPassword(password, folder.salt, folder.passwordHash);
};

/**
 * Checks if a folder is locked.
 */
export const isFolderLocked = async (folderId) => {
  if (!folderId) return false;
  const folder = await db.folders.get(folderId);
  return !!(folder && folder.isLocked);
};
