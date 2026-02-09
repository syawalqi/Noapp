import { describe, it, expect } from 'vitest';

describe('Environment Sanity Check', () => {
  it('should pass a basic test', () => {
    expect(true).toBe(true);
  });

  it('should have React available', () => {
    // @ts-ignore
    import('react').then((React) => {
      expect(React).toBeDefined();
    });
  });
});
