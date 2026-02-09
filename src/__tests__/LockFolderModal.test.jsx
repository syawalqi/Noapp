import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import LockFolderModal from '../components/LockFolderModal';

describe('LockFolderModal', () => {
  const folder = { id: 1, name: 'Secret' };
  const onClose = vi.fn();
  const onLocked = vi.fn();

  it('should render correctly', () => {
    render(<LockFolderModal folder={folder} onClose={onClose} onLocked={onLocked} />);
    expect(screen.getByRole('heading', { name: /Lock Folder/i })).toBeInTheDocument();
    expect(screen.getByText(/"Secret"/)).toBeInTheDocument();
  });

  it('should show error when passwords do not match', () => {
    render(<LockFolderModal folder={folder} onClose={onClose} onLocked={onLocked} />);
    
    const inputs = screen.getAllByPlaceholderText('••••••••');
    fireEvent.change(inputs[0], { target: { value: 'password123' } });
    fireEvent.change(inputs[1], { target: { value: 'password456' } });
    
    // Target the submit button specifically
    const submitBtn = screen.getByRole('button', { name: /^Lock Folder$/i });
    fireEvent.click(submitBtn);
    
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });
});