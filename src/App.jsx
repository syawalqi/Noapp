import React from 'react';
import { useUI } from './context/UIContext';
import { useResizable } from './hooks/useResizable';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import Settings from './components/Settings';
import Todos from './components/Todos';

function App() {
  const { activeModule, isFocusMode } = useUI();
  
  const { width: sidebarWidth, setWidth: setSidebarWidth, startResizing: startSidebarResize } = useResizable(256, 200, 400, 'sidebarWidth');
  const { width: noteListWidth, setWidth: setNoteListWidth, startResizing: startNoteListResize } = useResizable(320, 250, 500, 'noteListWidth', (clientX) => clientX - sidebarWidth);

  // Dynamic clamping on window resize
  React.useEffect(() => {
    const handleWindowResize = () => {
      const winWidth = window.innerWidth;
      const maxSidebar = Math.min(400, winWidth * 0.4);
      const maxNoteList = Math.min(500, winWidth * 0.5);

      if (sidebarWidth > maxSidebar) setSidebarWidth(maxSidebar);
      if (noteListWidth > maxNoteList) setNoteListWidth(maxNoteList);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [sidebarWidth, noteListWidth, setSidebarWidth, setNoteListWidth]);

  return (
    <div className="flex h-screen bg-paper-100 font-sans text-paper-900 paper-grain">
      {!isFocusMode && (
        <>
          <Sidebar style={{ width: sidebarWidth }} />
          <div className="resize-handle" onMouseDown={startSidebarResize} />
        </>
      )}
      
      <main className="flex-1 flex overflow-hidden">
        {activeModule === 'notes' && (
          <>
            {!isFocusMode && (
              <>
                <NoteList style={{ width: noteListWidth }} />
                <div className="resize-handle" onMouseDown={startNoteListResize} />
              </>
            )}
            <Editor />
          </>
        )}
        
        {activeModule === 'todos' && <Todos />}

        {activeModule === 'settings' && <Settings />}
      </main>
    </div>
  );
}

export default App;