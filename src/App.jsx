import React from 'react';
import { useUI } from './context/UIContext';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import Settings from './components/Settings';

function App() {
  const { activeModule, isFocusMode } = useUI();

  return (
    <div className="flex h-screen bg-paper-100 font-sans text-paper-900">
      {!isFocusMode && <Sidebar />}
      
      <main className="flex-1 flex overflow-hidden">
        {activeModule === 'notes' && (
          <>
            {!isFocusMode && <NoteList />}
            <Editor />
          </>
        )}
        
        {activeModule === 'todos' && (
          <div className="flex-1 flex items-center justify-center text-paper-300">
            Todo module coming soon
          </div>
        )}

        {activeModule === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;