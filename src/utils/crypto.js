/**
 * Utility functions for client-side cryptography using Web Crypto API.
 */

const ITERATIONS = 100000;
const KEY_LEN = 32; // 256 bits
const SALT_LEN = 16; // 128 bits

/**
 * Converts an ArrayBuffer to a Hex string.
 */
const bufToHex = (buf) => {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Converts a Hex string to an ArrayBuffer.
 */
const hexToBuf = (hex) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
};

/**
 * Hashes a password using PBKDF2.
 * @param {string} password 
 * @param {string} [existingSalt] - If provided, uses this salt (for verification)
 * @returns {Promise<{salt: string, hash: string}>}
 */
export const hashPassword = async (password, existingSalt = null) => {
  const enc = new TextEncoder();
  const passwordBuf = enc.encode(password);
  
  const salt = existingSalt 
    ? hexToBuf(existingSalt) 
    : window.crypto.getRandomValues(new Uint8Array(SALT_LEN));

  // Import the password as a key
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    passwordBuf,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  // Derive the hash bits
  const hashBuffer = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    KEY_LEN * 8
  );

  return {
    salt: bufToHex(salt),
    hash: bufToHex(hashBuffer),
  };
};

/**
 * Verifies if a password matches a salt and hash.
 */
export const verifyPassword = async (password, salt, hash) => {
  const result = await hashPassword(password, salt);
  return result.hash === hash;
};
