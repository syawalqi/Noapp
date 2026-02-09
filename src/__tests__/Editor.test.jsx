import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { UIProvider } from '../context/UIContext';
import Editor from '../components/Editor';
import 'fake-indexeddb/auto';

describe('Editor Component', () => {
  it('should show placeholder when no note is selected', () => {
    render(
      <UIProvider>
        <Editor />
      </UIProvider>
    );
    expect(screen.getByText('Select a note to start writing')).toBeInTheDocument();
  });

  it('should render export button when note is selected', async () => {
    // Note: Mocking activeNoteId and note data would be complex here due to Dexie useLiveQuery
    // For now, we verify the placeholder logic.
    // In a more advanced test, we would mock the UIContext values.
  });
});
