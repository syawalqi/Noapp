import React, { useState } from 'react';
import { useUI } from '../context/UIContext';
import { useFolders } from '../hooks/useFolders';
import { useTags } from '../hooks/useTags';
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
  Lock,
  Unlock,
  Tag,
  Hash
} from 'lucide-react';

import LockFolderModal from './LockFolderModal';

const Sidebar = ({ style }) => {
  const { 
    activeModule, 
    setActiveModule, 
    activeFolderId, 
    setActiveFolderId,
    activeTagId,
    setActiveTagId,
    unlockedFolderIds,
    theme,
    toggleTheme
  } = useUI();
  const { folders, addFolder } = useFolders();
  const { tags } = useTags();
  const [lockingFolder, setLockingFolder] = useState(null);

  const handleAddFolder = () => {
    const name = prompt('Folder Name:');
    if (name) addFolder(name);
  };

  const handleSelectTag = (tagId) => {
    setActiveFolderId(null);
    setActiveTagId(tagId);
  };

  const handleSelectFolder = (folderId) => {
    setActiveTagId(null);
    setActiveFolderId(folderId);
  };

  const navItems = [
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'todos', label: 'Todos', icon: CheckSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className="h-screen bg-paper-100 border-r border-paper-200 flex flex-col shrink-0 overflow-hidden"
      style={{ width: '16rem', ...style }}
    >
      {/* App Logo/Header */}
      <div className="layout-header">
        <h1 className="text-2xl font-serif font-bold text-paper-800 tracking-tight">NoApp</h1>
      </div>

      {/* Main Navigation */}
      <nav className="px-4 py-4 space-y-1 overflow-y-auto">
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
        <div className="flex-1 overflow-y-auto px-4 space-y-8">
          {/* Folders */}
          <div>
            <div className="flex items-center justify-between mb-2 px-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-paper-400">Folders</span>
              <button 
                onClick={handleAddFolder}
                className="p-1 hover:bg-paper-200 rounded-full transition-colors text-paper-600"
                title="New Folder"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            
            <div className="space-y-1">
              {folders?.map((folder) => {
                const isLocked = folder.isLocked && !unlockedFolderIds.includes(folder.id);
                const isUnlocked = folder.isLocked && unlockedFolderIds.includes(folder.id);
                
                return (
                  <div key={folder.id} className="group relative">
                    <button
                      onClick={() => handleSelectFolder(folder.id)}
                      className={`w-full flex items-center px-3 py-1.5 text-sm rounded-sm transition-colors ${
                        activeFolderId === folder.id
                          ? 'bg-paper-200 text-paper-900 shadow-sm'
                          : 'text-paper-600 hover:bg-paper-100 hover:text-paper-900'
                      }`}
                    >
                      <Folder className="mr-3 h-4 w-4" />
                      <span className="truncate flex-1 text-left">{folder.name}</span>
                      {isLocked && <Lock className="h-3 w-3 text-paper-400" />}
                      {isUnlocked && <Unlock className="h-3 w-3 text-green-600" />}
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
                );
              })}
            </div>
          </div>

          {/* Tags */}
          {tags?.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-paper-400">Tags</span>
              </div>
              <div className="space-y-1">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleSelectTag(tag.id)}
                    className={`w-full flex items-center px-3 py-1.5 text-sm rounded-sm transition-colors ${
                      activeTagId === tag.id
                        ? 'bg-paper-200 text-paper-900 shadow-sm'
                        : 'text-paper-600 hover:bg-paper-100 hover:text-paper-900'
                    }`}
                  >
                    <Hash className="mr-3 h-4 w-4 opacity-40" />
                    <span className="truncate flex-1 text-left">{tag.name}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
                  </button>
                ))}
              </div>
            </div>
          )}
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