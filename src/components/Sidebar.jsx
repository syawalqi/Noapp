import React, { useState } from 'react';
import { useUI } from '../context/UIContext';
import { useFolders } from '../hooks/useFolders';
import { 
  FileText, 
  CheckSquare, 
  Settings, 
  Plus, 
  Folder, 
  ChevronRight, 
  ChevronDown,
  Moon,
  Sun,
  Lock
} from 'lucide-react';

import LockFolderModal from './LockFolderModal';

const Sidebar = () => {
  const { 
    activeModule, 
    setActiveModule, 
    activeFolderId, 
    setActiveFolderId,
    theme,
    toggleTheme
  } = useUI();
  const { folders, addFolder } = useFolders();
  const [lockingFolder, setLockingFolder] = useState(null);

  const handleAddFolder = () => {
    const name = prompt('Folder Name:');
    if (name) addFolder(name);
  };

  const navItems = [
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'todos', label: 'Todos', icon: CheckSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-paper-100 border-r border-paper-200 flex flex-col">
      {/* App Logo/Header */}
      <div className="p-6">
        <h1 className="text-2xl font-serif font-bold text-paper-800 tracking-tight">NoApp</h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-sm transition-colors ${
                isActive 
                  ? 'bg-paper-200 text-paper-900 shadow-sm' 
                  : 'text-paper-700 hover:bg-paper-200 hover:text-paper-900'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <hr className="my-6 border-paper-200 mx-4" />

      {/* Folders Section (Only for Notes module) */}
      {activeModule === 'notes' && (
        <div className="flex-1 overflow-y-auto px-4">
          <div className="flex items-center justify-between mb-2 px-3">
            <span className="text-xs font-semibold text-paper-700 uppercase tracking-wider">Folders</span>
            <button 
              onClick={handleAddFolder}
              className="p-1 hover:bg-paper-200 rounded-full transition-colors"
              title="New Folder"
            >
              <Plus className="h-4 w-4 text-paper-700" />
            </button>
          </div>
          
          <div className="space-y-1">
            {folders?.map((folder) => (
              <div key={folder.id} className="group relative">
                <button
                  onClick={() => setActiveFolderId(folder.id)}
                  className={`w-full flex items-center px-3 py-1.5 text-sm rounded-sm transition-colors ${
                    activeFolderId === folder.id
                      ? 'bg-paper-300 text-paper-900'
                      : 'text-paper-700 hover:bg-paper-200'
                  }`}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  <span className="truncate flex-1 text-left">{folder.name}</span>
                  {folder.isLocked && <Lock className="h-3 w-3 text-paper-400" />}
                </button>
                {!folder.isLocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLockingFolder(folder);
                    }}
                    className="absolute right-2 top-1.5 p-0.5 opacity-0 group-hover:opacity-100 hover:bg-paper-300 rounded transition-all"
                    title="Lock Folder"
                  >
                    <Lock className="h-3 w-3 text-paper-700" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="p-4 border-t border-paper-200">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-paper-700 hover:bg-paper-200 rounded-sm transition-colors"
        >
          {theme === 'light' ? <Moon className="mr-3 h-5 w-5" /> : <Sun className="mr-3 h-5 w-5" />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      {lockingFolder && (
        <LockFolderModal 
          folder={lockingFolder} 
          onClose={() => setLockingFolder(null)}
          onLocked={() => setLockingFolder(null)}
        />
      )}
    </div>
  );
};

export default Sidebar;