import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { useUI } from '../context/UIContext';

export const useNotes = (folderId = null, tagId = null) => {
  const { unlockedFolderIds } = useUI();

  const notes = useLiveQuery(
    async () => {
      let query;
      
      if (tagId) {
        query = db.notes.where('tagIds').equals(tagId);
      } else if (folderId) {
        query = db.notes.where('folderId').equals(folderId);
      } else {
        query = db.notes;
      }

      const results = await query.toArray();

      // Filter out notes from locked folders that are NOT in session-unlocked list
      // Note: This is an extra safety check for tag-based global filtering
      const filteredResults = [];
      for (const note of results) {
        if (!note.folderId) {
          filteredResults.push(note);
          continue;
        }
        
        const folder = await db.folders.get(note.folderId);
        if (!folder?.isLocked || unlockedFolderIds.includes(folder.id)) {
          filteredResults.push(note);
        }
      }

      return filteredResults;
    },
    [folderId, tagId, unlockedFolderIds]
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
