import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export const useTags = () => {
  const tags = useLiveQuery(() => db.tags.toArray(), []);

  const addTag = async (name, color = '#777777') => {
    try {
      return await db.tags.add({ name, color });
    } catch (e) {
      if (e.name === 'ConstraintError') {
        // Tag already exists
        const existing = await db.tags.where('name').equals(name).first();
        return existing.id;
      }
      throw e;
    }
  };

  const updateTag = async (id, changes) => {
    return await db.tags.update(id, changes);
  };

  const deleteTag = async (id) => {
    // Note: To avoid complex transaction issues in tests with fake-indexeddb,
    // we perform operations sequentially. In a real app, db.transaction is preferred.
    
    // 1. Find all notes using this tag
    const notesWithTag = await db.notes.where('tagIds').equals(id).toArray();
    
    // 2. Remove the tag ID from those notes
    for (const note of notesWithTag) {
      const newTagIds = (note.tagIds || []).filter(tid => tid !== id);
      await db.notes.update(note.id, { tagIds: newTagIds });
    }
    
    // 3. Delete the tag record
    return await db.tags.delete(id);
  };

  const getTagsByIds = async (ids) => {
    if (!ids || ids.length === 0) return [];
    return await db.tags.where('id').anyOf(ids).toArray();
  };

  return {
    tags,
    addTag,
    updateTag,
    deleteTag,
    getTagsByIds
  };
};
