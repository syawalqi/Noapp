import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { UIProvider } from '../context/UIContext';
import NoteList from '../components/NoteList';
import 'fake-indexeddb/auto';

describe('NoteList Component', () => {
  const renderNoteList = (activeFolderId = null) => {
    return render(
      <UIProvider>
        <NoteList />
      </UIProvider>
    );
  };

  it('should show prompt when no folder is selected', () => {
    renderNoteList();
    expect(screen.getByText('Select a folder to see notes')).toBeInTheDocument();
  });
});
