import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useUI } from '../context/UIContext';

export const useNotes = (folderId = null) => {
  const { unlockedFolderIds } = useUI();

  const notes = useLiveQuery(
    async () => {
      if (!folderId) return await db.notes.toArray();

      // Check if the specific folder is locked
      const folder = await db.folders.get(folderId);
      if (folder?.isLocked && !unlockedFolderIds.includes(folderId)) {
        return []; // Return empty if locked and not session-unlocked
      }

      return await db.notes.where('folderId').equals(folderId).toArray();
    },
    [folderId, unlockedFolderIds]
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
