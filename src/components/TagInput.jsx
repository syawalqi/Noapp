import React, { useState, useEffect, useRef } from 'react';
import { useTags } from '../hooks/useTags';
import { Tag, Plus, X } from 'lucide-react';

const TagInput = ({ activeTagIds, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsPreviewOpen] = useState(false);
  const { tags, addTag } = useTags();
  const dropdownRef = useRef(null);

  const availableTags = tags?.filter(t => !activeTagIds.includes(t.id)) || [];
  const filteredTags = availableTags.filter(t => 
    t.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTagId = await addTag(inputValue.trim());
      onAddTag(newTagId);
      setInputValue('');
      setIsPreviewOpen(false);
    }
  };

  const selectTag = (tagId) => {
    onAddTag(tagId);
    setInputValue('');
    setIsPreviewOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPreviewOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center bg-paper-100 px-3 py-1.5 rounded-sm border border-paper-200">
        <Tag size={14} className="text-paper-400 mr-2" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsPreviewOpen(true);
          }}
          onFocus={() => setIsPreviewOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Add tag..."
          className="bg-transparent text-xs font-bold uppercase tracking-wider text-paper-600 outline-none w-24 placeholder-paper-300"
        />
      </div>

      {isDropdownOpen && (inputValue || filteredTags.length > 0) && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-paper-50 border border-paper-200 shadow-lg rounded-sm z-50 py-1 max-h-48 overflow-y-auto paper-grain">
          {filteredTags.map(tag => (
            <button
              key={tag.id}
              onClick={() => selectTag(tag.id)}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-paper-700 hover:bg-paper-100 flex items-center transition-colors"
            >
              <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: tag.color }} />
              {tag.name}
            </button>
          ))}
          {inputValue && !tags?.find(t => t.name.toLowerCase() === inputValue.toLowerCase()) && (
            <button
              onClick={async () => {
                const id = await addTag(inputValue);
                selectTag(id);
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-paper-900 bg-paper-100 hover:bg-paper-200 flex items-center"
            >
              <Plus size={12} className="mr-3" />
              Create "{inputValue}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TagInput;
