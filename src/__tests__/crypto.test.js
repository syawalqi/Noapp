import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../utils/crypto';

describe('Crypto Utilities', () => {
  const password = 'test-password-123';

  it('should hash a password and return salt and hash as hex strings', async () => {
    const result = await hashPassword(password);
    expect(result).toHaveProperty('salt');
    expect(result).toHaveProperty('hash');
    expect(typeof result.salt).toBe('string');
    expect(typeof result.hash).toBe('string');
    expect(result.salt.length).toBeGreaterThan(0);
    expect(result.hash.length).toBeGreaterThan(0);
  });

  it('should verify a correct password', async () => {
    const { salt, hash } = await hashPassword(password);
    const isValid = await verifyPassword(password, salt, hash);
    expect(isValid).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const { salt, hash } = await hashPassword(password);
    const isValid = await verifyPassword('wrong-password', salt, hash);
    expect(isValid).toBe(false);
  });
});
