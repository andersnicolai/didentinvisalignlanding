"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackConversionRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        console.log('Received conversion tracking request:', req.body);
        // Implementer konverteringssporing her
        res.status(200).json({ message: 'Conversion tracked successfully' });
    }
    catch (error) {
        console.error('Error tracking conversion:', error);
        res.status(500).json({ error: 'Failed to track conversion' });
    }
});
exports.trackConversionRouter = router;
