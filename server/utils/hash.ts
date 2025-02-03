import crypto from 'crypto';

/**
 * Hasher data for Facebook CAPI i henhold til deres krav
 * @param data Data som skal hashes (e-post eller telefonnummer)
 * @returns SHA256-hashet verdi
 */
export const hashData = (data: string): string => {
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
};

export const prepareUserData = (data: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}) => {
  return {
    em: data.email ? [hashData(data.email)] : undefined,
    ph: data.phone ? [hashData(data.phone)] : undefined,
    fn: data.firstName ? [hashData(data.firstName)] : undefined,
    ln: data.lastName ? [hashData(data.lastName)] : undefined,
  };
}; 