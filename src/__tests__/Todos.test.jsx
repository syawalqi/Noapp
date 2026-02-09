import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Todos from '../components/Todos';
import { UIProvider } from '../context/UIContext';
import 'fake-indexeddb/auto';

describe('Todos Component', () => {
  it('should render correctly', () => {
    render(
      <UIProvider>
        <Todos />
      </UIProvider>
    );
    expect(screen.getByText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/What needs to be done/i)).toBeInTheDocument();
  });
});
