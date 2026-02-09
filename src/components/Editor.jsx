import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../context/UIContext';
import { useNotes } from '../hooks/useNotes';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Save, Trash2, Maximize2, Minimize2, Lock } from 'lucide-react';

const Editor = () => {
  const { activeNoteId, setActiveNoteId, isFocusMode, setIsFocusMode, unlockedFolderIds } = useUI();
  const { updateNote, deleteNote } = useNotes();
  
  // Use live query to get current note and its folder status
  const noteData = useLiveQuery(
    async () => {
      if (!activeNoteId) return null;
      const note = await db.notes.get(activeNoteId);
      if (!note) return null;
      const folder = await db.folders.get(note.folderId);
      return { note, folder };
    },
    [activeNoteId, unlockedFolderIds]
  );

  const note = noteData?.note;
  const folder = noteData?.folder;
  const isLocked = folder?.isLocked && !unlockedFolderIds.includes(folder.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Sync local state with DB
  useEffect(() => {
    if (note && !isLocked) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note?.id, isLocked]);

  const handleTitleChange = (e) => {
    if (isLocked) return;
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNote(activeNoteId, { title: newTitle });
  };

  const handleContentChange = (e) => {
    if (isLocked) return;
    const newContent = e.target.value;
    setContent(newContent);
    updateNote(activeNoteId, { content: newContent });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      await deleteNote(activeNoteId);
      setActiveNoteId(null);
    }
  };

  if (!activeNoteId || !note) {
    return (
      <div className="flex-1 bg-paper-50 flex items-center justify-center text-paper-300 italic font-serif">
        Select a note to start writing
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex-1 bg-paper-50 flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-paper-100 p-6 rounded-full mb-6">
          <Lock className="h-12 w-12 text-paper-300" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-paper-800 mb-2">Content Restricted</h2>
        <p className="text-paper-400 text-sm max-w-xs mx-auto">
          This note belongs to a locked folder. Please unlock the folder in the sidebar to view or edit this content.
        </p>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col bg-paper-50 transition-all duration-500 ${isFocusMode ? 'px-4 md:px-32 lg:px-64' : 'px-8'}`}>
      {/* Editor Toolbar */}
      <div className="py-4 flex justify-between items-center border-b border-paper-100 mb-8">
        <div className="flex items-center space-x-4 text-xs text-paper-400 font-serif italic">
          {folder?.name}
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="p-2 hover:bg-paper-200 rounded-sm text-paper-700 transition-colors"
            title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          >
            {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-sm text-paper-300 transition-colors"
            title="Delete Note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="text-4xl font-serif font-bold bg-transparent border-none outline-none mb-6 placeholder-paper-200 text-paper-900"
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className="flex-1 bg-transparent border-none outline-none resize-none font-sans text-lg leading-relaxed placeholder-paper-200 text-paper-800"
        />
      </div>

      {/* Footer Info */}
      <div className="py-4 text-xs text-paper-300 font-sans border-t border-paper-100 flex justify-between">
        <span>Characters: {content.length}</span>
        <span>Last updated: {new Date(note.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Editor;
