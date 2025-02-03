"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.post('/submit-form', async (req, res) => {
    try {
        const formData = new URLSearchParams();
        formData.append('entry.1305713745', req.body.name);
        formData.append('entry.323810053', req.body.email);
        formData.append('entry.1561425906', req.body.phone);
        formData.append('entry.1779318001', req.body.date);
        formData.append('entry.1479501297', req.body.time);
        await axios_1.default.post('https://docs.google.com/forms/d/e/1FAIpQLSec7las55qWWGg4mTsfzji6dEJt4UOV_xv1EutXMHKywhM5tA/formResponse', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ success: false, error: 'Form submission failed' });
    }
});
exports.default = router;
