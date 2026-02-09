import Dexie from 'dexie';

export const db = new Dexie('NoAppDB');

// Define the database schema
// folders: id, name, parentId, isLocked, passwordHash, createdAt, updatedAt
// notes: id, title, content, folderId, isFavorite, createdAt, updatedAt, tagIds (array)
// todoCategories: id, name, color
// todos: id, title, isCompleted, categoryId, dueDate, createdAt
// tags: id, name, color
db.version(3).stores({
  folders: '++id, name, parentId, isLocked, createdAt',
  notes: '++id, title, folderId, isFavorite, *tagIds, createdAt, updatedAt',
  todoCategories: '++id, name, color',
  todos: '++id, title, isCompleted, categoryId, dueDate, createdAt',
  tags: '++id, &name, color'
});

export default db;
