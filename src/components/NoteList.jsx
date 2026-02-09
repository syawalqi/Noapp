import React from 'react';
import { useUI } from '../context/UIContext';
import { useNotes } from '../hooks/useNotes';
import { Plus, FileText, Calendar } from 'lucide-react';

import UnlockFolderDialog from './UnlockFolderDialog';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const NoteList = ({ style }) => {
  const { activeFolderId, activeNoteId, setActiveNoteId, activeTagId, unlockedFolderIds, unlockFolder } = useUI();
  const { notes, addNote } = useNotes(activeFolderId, activeTagId);
  
  const activeFolder = useLiveQuery(
    () => (activeFolderId ? db.folders.get(activeFolderId) : null),
    [activeFolderId]
  );

  const activeTag = useLiveQuery(
    () => (activeTagId ? db.tags.get(activeTagId) : null),
    [activeTagId]
  );

  const isLocked = activeFolder?.isLocked && !unlockedFolderIds.includes(activeFolderId);

  const handleAddNote = () => {
    if (!activeFolderId) {
      alert('Please select a folder first');
      return;
    }
    addNote('Untitled Note', '', activeFolderId);
  };

  if (activeFolderId && isLocked) {
    return (
      <UnlockFolderDialog 
        folderId={activeFolderId} 
        folderName={activeFolder.name} 
        onUnlocked={unlockFolder} 
      />
    );
  }

  return (
    <div 
      className="h-screen bg-transparent border-r border-paper-200 flex flex-col shrink-0 overflow-hidden"
      style={{ width: '20rem', ...style }}
    >
      <div className="layout-header justify-between">
        <h2 className="text-sm font-semibold text-paper-700 uppercase tracking-wider truncate mr-4">
          {activeTag ? `# ${activeTag.name}` : (activeFolder?.name || 'Notes')}
        </h2>
        {!activeTagId && (
          <button 
            onClick={handleAddNote}
            className="p-1 hover:bg-paper-200 rounded-sm transition-colors shrink-0"
            title="New Note"
          >
            <Plus className="h-5 w-5 text-paper-700" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!activeFolderId && !activeTagId ? (
          <div className="p-8 text-center text-paper-300 italic text-sm animate-in fade-in duration-500">
            Select a folder or tag to see notes
          </div>
        ) : notes?.length === 0 ? (
          <div className="p-8 text-center text-paper-300 italic text-sm animate-in fade-in duration-500">
            {activeTagId ? 'No notes with this tag' : 'No notes in this folder'}
          </div>
        ) : (
          <div key={activeFolderId || activeTagId} className="divide-y divide-paper-100 animate-in fade-in slide-in-from-left-2 duration-300">
            {notes?.map((note) => (
              <button
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`w-full text-left p-4 hover:bg-paper-100 transition-colors ${
                  activeNoteId === note.id ? 'bg-paper-200' : ''
                }`}
              >
                <div className="flex items-center mb-1">
                  <FileText className="h-3 w-3 mr-2 text-paper-700" />
                  <span className="text-sm font-semibold truncate text-paper-900">
                    {note.title || 'Untitled'}
                  </span>
                </div>
                <div className="flex items-center text-xs text-paper-700">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(note.updatedAt).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteList;
