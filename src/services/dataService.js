import { db } from '../db';

/**
 * Exports the entire database content as a JSON object.
 * @returns {Promise<Object>}
 */
export const exportData = async () => {
  const folders = await db.folders.toArray();
  const notes = await db.notes.toArray();
  
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      folders,
      notes
    }
  };
};

/**
 * Validates the structure of the imported data.
 */
const validateImport = (importObj) => {
  if (!importObj || typeof importObj !== 'object') return false;
  if (!importObj.data || typeof importObj.data !== 'object') return false;
  if (!Array.isArray(importObj.data.folders)) return false;
  if (!Array.isArray(importObj.data.notes)) return false;
  
  // Optional: More deep validation can be added here
  return true;
};

/**
 * Imports data from a JSON object into the database.
 * Note: This clears existing data first.
 * @param {Object} importObj 
 */
export const importData = async (importObj) => {
  if (!validateImport(importObj)) {
    throw new Error('Invalid backup file format');
  }

  return await db.transaction('rw', db.folders, db.notes, async () => {
    // 1. Clear existing data
    await db.folders.clear();
    await db.notes.clear();

    // 2. Restore data
    await db.folders.bulkAdd(importObj.data.folders);
    await db.notes.bulkAdd(importObj.data.notes);
  });
};
