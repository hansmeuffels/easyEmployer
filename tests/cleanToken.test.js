import { describe, it, expect } from 'vitest';
import { cleanToken } from '../api/_shared.js';

describe('cleanToken', () => {
  // --- Null / undefined / empty ---
  it('returns null for null input', () => {
    expect(cleanToken(null)).toBeNull();
  });

  it('returns undefined for undefined input', () => {
    expect(cleanToken(undefined)).toBeUndefined();
  });

  it('returns empty string for empty string', () => {
    expect(cleanToken('')).toBe('');
  });

  // --- Plain token ---
  it('returns a plain token unchanged', () => {
    expect(cleanToken('abc123')).toBe('abc123');
  });

  it('trims whitespace from a plain token', () => {
    expect(cleanToken('  abc123  ')).toBe('abc123');
  });

  // --- Quoted token ---
  it('strips double quotes', () => {
    expect(cleanToken('"abc123"')).toBe('abc123');
  });

  it('strips single quotes', () => {
    expect(cleanToken("'abc123'")).toBe('abc123');
  });

  it('strips quotes with trailing comma', () => {
    expect(cleanToken('"abc123",')).toBe('abc123');
  });

  // --- Key-value format ---
  it('strips "access_token": "value"', () => {
    expect(cleanToken('"access_token": "abc123"')).toBe('abc123');
  });

  it('strips access_token: "value" (no quotes on key)', () => {
    expect(cleanToken('access_token: "abc123"')).toBe('abc123');
  });

  it('strips \'access_token\': \'value\' (single quotes)', () => {
    expect(cleanToken("'access_token': 'abc123'")).toBe('abc123');
  });

  it('is case-insensitive for key name', () => {
    expect(cleanToken('"Access_Token": "abc123"')).toBe('abc123');
  });

  it('handles key-value with trailing comma', () => {
    expect(cleanToken('"access_token": "abc123",')).toBe('abc123');
  });

  // --- Full JSON object ---
  it('strips full JSON object wrapper', () => {
    expect(cleanToken('{ "access_token": "abc123" }')).toBe('abc123');
  });

  it('strips JSON object with no spaces', () => {
    expect(cleanToken('{"access_token":"abc123"}')).toBe('abc123');
  });

  it('strips JSON object with trailing comma inside', () => {
    expect(cleanToken('{ "access_token": "abc123", }')).toBe('abc123');
  });

  // --- Real-world long tokens ---
  it('handles a real-world JWT-like token', () => {
    const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature';
    expect(cleanToken(jwt)).toBe(jwt);
  });

  it('extracts JWT from JSON wrapper', () => {
    const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature';
    expect(cleanToken(`{ "access_token": "${jwt}" }`)).toBe(jwt);
  });

  // --- Edge cases ---
  it('handles token that starts with a brace (not JSON)', () => {
    // A token that happens to start with { but is not JSON
    expect(cleanToken('{abc123}')).toBe('abc123');
  });

  it('handles only whitespace', () => {
    expect(cleanToken('   ')).toBe('');
  });
});
