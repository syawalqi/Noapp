import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Settings from '../components/Settings';

describe('Settings Component', () => {
  it('should render data management section', () => {
    render(<Settings />);
    expect(screen.getByText(/Data Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Backup/i)).toBeInTheDocument();
    expect(screen.getByText(/Import Backup/i)).toBeInTheDocument();
  });
});
