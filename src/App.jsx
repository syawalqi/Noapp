import React from 'react';
import { useUI } from './context/UIContext';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';

function App() {
  const { activeModule, isFocusMode } = useUI();

  return (
    <div className="flex h-screen bg-paper-100 font-sans">
      {!isFocusMode && <Sidebar />}
      
      <main className="flex-1 flex overflow-hidden">
        {activeModule === 'notes' && (
          <>
            <NoteList />
            <div className="flex-1 bg-paper-50 flex items-center justify-center text-paper-300 italic">
              Select a note to start writing
            </div>
          </>
        )}
        
        {activeModule === 'todos' && (
          <div className="flex-1 flex items-center justify-center text-paper-300">
            Todo module coming soon
          </div>
        )}

        {activeModule === 'settings' && (
          <div className="flex-1 flex items-center justify-center text-paper-300">
            Settings module coming soon
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
