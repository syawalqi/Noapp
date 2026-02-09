import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export const useNotes = (folderId = null) => {
  const notes = useLiveQuery(
    () => (folderId ? db.notes.where('folderId').equals(folderId).toArray() : db.notes.toArray()),
    [folderId]
  );

  const addNote = async (title, content, folderId) => {
    return await db.notes.add({
      title,
      content,
      folderId,
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const updateNote = async (id, changes) => {
    return await db.notes.update(id, {
      ...changes,
      updatedAt: new Date(),
    });
  };

  const deleteNote = async (id) => {
    return await db.notes.delete(id);
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
};
