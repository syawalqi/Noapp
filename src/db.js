import Dexie from 'dexie';

export const db = new Dexie('NoAppDB');

// Define the database schema
// folders: id, name, parentId, isLocked, passwordHash, createdAt, updatedAt
// notes: id, title, content, folderId, isFavorite, createdAt, updatedAt
db.version(1).stores({
  folders: '++id, name, parentId, isLocked, createdAt',
  notes: '++id, title, folderId, isFavorite, createdAt, updatedAt'
});

export default db;
