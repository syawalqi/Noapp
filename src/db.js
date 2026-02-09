import Dexie from 'dexie';

export const db = new Dexie('NoAppDB');

// Define the database schema
// folders: id, name, parentId, isLocked, passwordHash, createdAt, updatedAt
// notes: id, title, content, folderId, isFavorite, createdAt, updatedAt
// todoCategories: id, name, color
// todos: id, title, isCompleted, categoryId, dueDate, createdAt
db.version(2).stores({
  folders: '++id, name, parentId, isLocked, createdAt',
  notes: '++id, title, folderId, isFavorite, createdAt, updatedAt',
  todoCategories: '++id, name, color',
  todos: '++id, title, isCompleted, categoryId, dueDate, createdAt'
});

export default db;