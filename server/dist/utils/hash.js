"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareUserData = exports.hashData = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Hasher data for Facebook CAPI i henhold til deres krav
 * @param data Data som skal hashes (e-post eller telefonnummer)
 * @returns SHA256-hashet verdi
 */
const hashData = (data) => {
    return crypto_1.default
        .createHash('sha256')
        .update(data.toLowerCase().trim())
        .digest('hex');
};
exports.hashData = hashData;
const prepareUserData = (data) => {
    return {
        em: data.email ? [(0, exports.hashData)(data.email)] : undefined,
        ph: data.phone ? [(0, exports.hashData)(data.phone)] : undefined,
        fn: data.firstName ? [(0, exports.hashData)(data.firstName)] : undefined,
        ln: data.lastName ? [(0, exports.hashData)(data.lastName)] : undefined,
    };
};
exports.prepareUserData = prepareUserData;
