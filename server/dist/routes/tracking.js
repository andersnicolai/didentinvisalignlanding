"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.trackingRouter = router;
router.post('/', async (req, res) => {
    try {
        const { event, params, timestamp, url } = req.body;
        // Log event data
        console.log('Event tracked:', {
            event,
            params,
            timestamp,
            url,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });
        res.json({
            success: true,
            message: 'Event tracked successfully'
        });
    }
    catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({
            success: false,
            error: (error === null || error === void 0 ? void 0 : error.message) || 'Unknown error'
        });
    }
});
