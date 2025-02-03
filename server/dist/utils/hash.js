"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashData = hashData;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Hasher data for Facebook CAPI i henhold til deres krav
 * @param data Data som skal hashes (e-post eller telefonnummer)
 * @returns SHA256-hashet verdi
 */
function hashData(data) {
    if (!data)
        return '';
    // Fjern alle mellomrom og konverter til lowercase
    const normalizedData = data.trim().toLowerCase();
    // Returner SHA256 hash
    return crypto_1.default
        .createHash('sha256')
        .update(normalizedData)
        .digest('hex');
}
