import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Tailwind Theme Configuration', () => {
  it('should have custom paper color tokens in index.css', () => {
    const cssPath = path.resolve(__dirname, '../index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    
    expect(cssContent).toContain('--color-paper-50');
    expect(cssContent).toContain('--color-paper-100');
    expect(cssContent).toContain('--color-paper-200');
    expect(cssContent).toContain('--color-paper-300');
    expect(cssContent).toContain('--font-serif');
    expect(cssContent).toContain('--font-sans');
  });
});
