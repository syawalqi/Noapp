import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadFile, pickAndReadFile } from '../utils/file';

describe('File Utilities', () => {
  beforeEach(() => {
    // Mock URL APIs not fully present in JSDOM
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
    
    // Mock link click
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  it('should create a download link and trigger click', () => {
    const content = '# Test Content';
    const fileName = 'test.md';
    const contentType = 'text/markdown';

    downloadFile(content, fileName, contentType);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });

  it('should trigger file picker', async () => {
    // We can't easily test the full async flow of FileReader in JSDOM 
    // without heavy mocking, but we can verify the function exists
    // and triggers the click.
    const spy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
    
    // We don't await because it won't resolve without a manual change event
    pickAndReadFile('.json');
    
    expect(spy).toHaveBeenCalled();
  });
});
