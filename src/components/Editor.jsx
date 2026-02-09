import React, { useState, useEffect, useRef } from 'react';
import { useUI } from '../context/UIContext';
import { useNotes } from '../hooks/useNotes';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { 
  Trash2, 
  Maximize2, 
  Minimize2, 
  Lock, 
  Download, 
  Eye, 
  Edit3, 
  X, 
  Bold, 
  Italic, 
  List, 
  Link, 
  Type,
  Layers
} from 'lucide-react';
import { downloadFile } from '../utils/file';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TagInput from './TagInput';
import { useTags } from '../hooks/useTags';

const Editor = () => {
  const { 
    activeNoteId, 
    setActiveNoteId, 
    isFocusMode, 
    setIsFocusMode, 
    unlockedFolderIds, 
    paperType, 
    setPaperType 
  } = useUI();
  const { updateNote, deleteNote } = useNotes();
  const textareaRef = useRef(null);
  const [isPreview, setIsPreview] = useState(false);
  
  const noteData = useLiveQuery(
    async () => {
      if (!activeNoteId) return null;
      const note = await db.notes.get(activeNoteId);
      if (!note) return null;
      const folder = await db.folders.get(note.folderId);
      const tags = await db.tags.where('id').anyOf(note.tagIds || []).toArray();
      return { note, folder, tags };
    },
    [activeNoteId, unlockedFolderIds]
  );

  const note = noteData?.note;
  const folder = noteData?.folder;
  const tags = noteData?.tags || [];
  const isLocked = folder?.isLocked && !unlockedFolderIds.includes(folder.id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b': e.preventDefault(); formatText('**'); break;
        case 'i': e.preventDefault(); formatText('*'); break;
        case 'k': e.preventDefault(); formatText('[', '](url)'); break;
        default: break;
      }
    }
  };

  const formatText = (prefix, suffix = prefix) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    const newContent = `${before}${prefix}${selection}${suffix}${after}`;
    setContent(newContent);
    updateNote(activeNoteId, { content: newContent });
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleAddTag = async (tagId) => {
    const currentTagIds = note.tagIds || [];
    if (!currentTagIds.includes(tagId)) {
      await updateNote(activeNoteId, { tagIds: [...currentTagIds, tagId] });
    }
  };

  const handleRemoveTag = async (tagId) => {
    const currentTagIds = note.tagIds || [];
    await updateNote(activeNoteId, { tagIds: currentTagIds.filter(id => id !== tagId) });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      await deleteNote(activeNoteId);
      setActiveNoteId(null);
    }
  };

  const handleExport = () => {
    const fileName = `${title || 'Untitled'}.md`;
    const exportContent = `# ${title || 'Untitled'}\n\n${content}`;
    downloadFile(exportContent, fileName, 'text/markdown');
  };

  if (!activeNoteId || !note) {
    return (
      <div className="flex-1 bg-transparent flex items-center justify-center text-paper-300 italic font-serif text-lg">
        Select a note to start writing
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="flex-1 bg-transparent flex flex-col items-center justify-center p-8 text-center">
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

  const paperClasses = {
    plain: '',
    lined: 'paper-lined',
    grid: 'paper-grid',
    dotted: 'paper-dotted'
  };

  const paperOptions = [
    { id: 'plain', label: 'Plain Paper', class: '' },
    { id: 'lined', label: 'Lined Paper', class: 'paper-lined' },
    { id: 'grid', label: 'Grid Paper', class: 'paper-grid' },
    { id: 'dotted', label: 'Dotted Paper', class: 'paper-dotted' },
  ];

  const headerPadding = isFocusMode ? 'px-4 md:px-32 lg:px-64' : 'px-8';

  return (
    <div className="flex-1 flex flex-col bg-transparent paper-grain h-screen overflow-hidden relative">
      {/* Editor Toolbar - Dynamic wrapping */}
      <div className={`layout-header h-auto py-3 gap-y-4 flex-wrap justify-between border-b border-paper-100 bg-paper-100/80 backdrop-blur-md sticky top-0 z-30 shrink-0 ${headerPadding}`}>
        
        {/* Tool Groups */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {/* Metadata & Tagging */}
          <div className="flex items-center space-x-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-paper-400 font-serif italic hidden md:block truncate max-w-[100px]">
              {folder?.name}
            </div>
            <TagInput 
              activeTagIds={note.tagIds || []} 
              onAddTag={handleAddTag} 
              onRemoveTag={handleRemoveTag} 
            />
          </div>

          <div className="hidden sm:block w-px h-4 bg-paper-200" />

          {/* Formatting */}
          <div className="flex items-center space-x-1 bg-paper-50 p-1 rounded-sm border border-paper-200 shadow-sm">
            <button onClick={() => formatText('**')} className="p-1.5 hover:bg-paper-200 rounded-sm text-paper-600" title="Bold"><Bold size={14} /></button>
            <button onClick={() => formatText('*')} className="p-1.5 hover:bg-paper-200 rounded-sm text-paper-600" title="Italic"><Italic size={14} /></button>
            <button onClick={() => formatText('### ', '')} className="p-1.5 hover:bg-paper-200 rounded-sm text-paper-600" title="Heading"><Type size={14} /></button>
            <button onClick={() => formatText('\n- ', '')} className="p-1.5 hover:bg-paper-200 rounded-sm text-paper-600" title="List"><List size={14} /></button>
            <button onClick={() => formatText('[', '](url)')} className="p-1.5 hover:bg-paper-200 rounded-sm text-paper-600" title="Link"><Link size={14} /></button>
          </div>

          <div className="hidden sm:block w-px h-4 bg-paper-200" />

          {/* Paper Selection */}
          <div className="flex items-center space-x-1 bg-paper-50 p-1 rounded-sm border border-paper-200 shadow-sm">
            {paperOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setPaperType(option.id)}
                title={option.label}
                className={`w-6 h-6 rounded-sm border transition-all flex items-center justify-center overflow-hidden ${
                  paperType === option.id 
                    ? 'border-paper-700 ring-1 ring-paper-700' 
                    : 'border-paper-200 hover:border-paper-400'
                } bg-paper-50 ${option.class}`}
                style={option.id !== 'plain' ? { backgroundSize: '4px 4px' } : {}}
              >
                {paperType === option.id && <div className="w-1 h-1 bg-paper-700 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* View & Actions */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className={`px-3 py-1.5 rounded-sm transition-colors flex items-center text-[10px] font-bold uppercase tracking-wider border ${
              isPreview 
                ? 'bg-paper-800 text-paper-50 border-paper-800 shadow-md' 
                : 'hover:bg-paper-200 text-paper-700 border-paper-200'
            }`}
          >
            {isPreview ? <Edit3 size={14} className="mr-2" /> : <Eye size={14} className="mr-2" />}
            <span>{isPreview ? 'Edit' : 'Preview'}</span>
          </button>
          <div className="w-px h-4 bg-paper-200 mx-1" />
          <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-2 hover:bg-paper-200 rounded-sm text-paper-700" title="Focus Mode">
            {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={handleExport} className="p-2 hover:bg-paper-200 rounded-sm text-paper-700" title="Export"><Download size={18} /></button>
          <button onClick={handleDelete} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-sm text-paper-300 transition-colors" title="Delete"><Trash2 size={18} /></button>
        </div>
      </div>

      {/* Inputs - Scrollable Area */}
      <div key={activeNoteId} className="flex-1 overflow-y-auto pt-12 pb-24">
        <div className={`max-w-4xl w-full mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500 ${headerPadding}`}>
          {/* Tags display */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(tag => (
                <span key={tag.id} className="group flex items-center text-[10px] uppercase font-bold px-2 py-1 rounded-sm border border-paper-200 bg-paper-50 shadow-sm" style={{ color: tag.color, borderColor: tag.color + '40' }}>
                  {tag.name}
                  <button onClick={() => handleRemoveTag(tag.id)} className="ml-2 p-0.5 hover:bg-paper-200 rounded-full opacity-0 group-hover:opacity-100"><X size={10} /></button>
                </span>
              ))}
            </div>
          )}

          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Note Title"
            className="text-4xl font-serif font-bold bg-transparent border-none outline-none mb-8 placeholder-paper-200 text-paper-900 w-full"
          />
          
          {isPreview ? (
            <div className={`prose prose-paper max-w-none font-sans text-lg leading-relaxed text-paper-800 ${paperClasses[paperType]}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleKeyDown}
              placeholder="Start writing..."
              className={`w-full min-h-[60vh] bg-transparent border-none outline-none resize-none font-sans text-lg leading-relaxed placeholder-paper-200 text-paper-800 ${paperClasses[paperType]}`}
            />
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className={`py-3 text-[10px] uppercase tracking-widest font-bold text-paper-300 border-t border-paper-100 flex justify-between bg-paper-100/30 shrink-0 ${headerPadding}`}>
        <span>Characters: {content.length}</span>
        <span>Last updated: {new Date(note.updatedAt).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Editor;