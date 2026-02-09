import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

export const useFolders = () => {
  const folders = useLiveQuery(() => db.folders.toArray(), []);

  const addFolder = async (name, parentId = null) => {
    return await db.folders.add({
      name,
      parentId,
      isLocked: false,
      createdAt: new Date(),
    });
  };

  const updateFolder = async (id, changes) => {
    return await db.folders.update(id, changes);
  };

  const deleteFolder = async (id) => {
    // Note: In a real app, we should also handle recursive deletion of subfolders and notes
    return await db.folders.delete(id);
  };

  return {
    folders,
    addFolder,
    updateFolder,
    deleteFolder,
  };
};
