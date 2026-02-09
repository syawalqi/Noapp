import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import UnlockFolderDialog from '../components/UnlockFolderDialog';

describe('UnlockFolderDialog', () => {
  it('should render correctly', () => {
    render(<UnlockFolderDialog folderId={1} folderName="Secret" onUnlocked={vi.fn()} />);
    expect(screen.getByText(/Folder Locked/i)).toBeInTheDocument();
    expect(screen.getByText(/"Secret"/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter password/i)).toBeInTheDocument();
  });
});
