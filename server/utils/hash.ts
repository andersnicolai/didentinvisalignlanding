import crypto from 'crypto';

/**
 * Hasher data for Facebook CAPI i henhold til deres krav
 * @param data Data som skal hashes (e-post eller telefonnummer)
 * @returns SHA256-hashet verdi
 */
export function hashData(data: string): string {
  if (!data) return '';
  
  // Fjern alle mellomrom og konverter til lowercase
  const normalizedData = data.trim().toLowerCase();
  
  // Returner SHA256 hash
  return crypto
    .createHash('sha256')
    .update(normalizedData)
    .digest('hex');
} 