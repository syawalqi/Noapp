import { describe, it, expect, vi, beforeEach } from 'vitest';
import { downloadFile } from '../utils/file';

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
});
