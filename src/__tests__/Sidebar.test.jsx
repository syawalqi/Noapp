import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { UIProvider } from '../context/UIContext';
import Sidebar from '../components/Sidebar';
import 'fake-indexeddb/auto';

describe('Sidebar Component', () => {
  const renderSidebar = () => {
    return render(
      <UIProvider>
        <Sidebar />
      </UIProvider>
    );
  };

  it('should render navigation items', () => {
    renderSidebar();
    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should allow switching modules', () => {
    renderSidebar();
    const todoButton = screen.getByText('Todos');
    fireEvent.click(todoButton);
    
    // Notes module has 'Folders' header, Todos should not
    expect(screen.queryByText('Folders')).not.toBeInTheDocument();
  });
});
