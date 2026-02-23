/**
 * Strip JSON wrapper, quotes, key names, commas from pasted tokens.
 * Handles common paste formats:
 *   - Plain token string
 *   - "access_token": "xyz..."
 *   - { "access_token": "xyz..." }
 *   - Quoted: "xyz..."
 */
export function cleanToken(raw) {
  if (!raw) return raw;
  let t = raw.trim();
  // Remove surrounding braces (if user pasted full JSON object)
  t = t.replace(/^\{/, '').replace(/\}$/, '').trim();
  // Remove key like "access_token" : or 'access_token' :
  t = t.replace(/^["']?access_token["']?\s*:\s*/i, '').trim();
  // Remove surrounding quotes and trailing commas
  t = t.replace(/^["']/, '').replace(/["'],?\s*$/, '').trim();
  return t;
}
