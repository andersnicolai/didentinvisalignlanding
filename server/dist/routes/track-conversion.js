"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackConversionRouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const hash_1 = require("../utils/hash");
const router = (0, express_1.Router)();
const sendToFacebookAPI = async (event) => {
    try {
        const response = await axios_1.default.post(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`, {
            data: [event],
            access_token: process.env.FB_ACCESS_TOKEN,
            partner_agent: "dident_capi_nodejs",
            test_event_code: process.env.NODE_ENV === 'development' ? 'TEST62496' : undefined
        });
        console.log('Facebook CAPI Response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Facebook CAPI Error:', error);
        throw error;
    }
};
const handleTracking = async (req, res, next) => {
    var _a, _b;
    try {
        const { event_name, value, user_data, session, properties } = req.body;
        console.log('Received tracking data:', JSON.stringify({
            event_name,
            value,
            user_data,
            session,
            properties
        }, null, 2));
        if (!process.env.FB_ACCESS_TOKEN) {
            console.error('FB_ACCESS_TOKEN is missing');
            res.status(500).json({ error: 'FB_ACCESS_TOKEN is not configured' });
            return;
        }
        if (!process.env.FB_PIXEL_ID) {
            console.error('FB_PIXEL_ID is missing');
            res.status(500).json({ error: 'FB_PIXEL_ID is not configured' });
            return;
        }
        try {
            const fbEvent = {
                event_name: event_name,
                event_id: req.body.event_id,
                event_time: Math.floor(Date.now() / 1000),
                user_data: {
                    em: (user_data === null || user_data === void 0 ? void 0 : user_data.email) ? (0, hash_1.hashData)(user_data.email) : undefined,
                    ph: (user_data === null || user_data === void 0 ? void 0 : user_data.phone) ? (0, hash_1.hashData)(user_data.phone) : undefined,
                    client_ip_address: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
                    client_user_agent: req.headers['user-agent'] || 'Unknown',
                    fbc: req.body.fbc,
                    fbp: req.body.fbp
                },
                custom_data: Object.assign({ value: value, currency: 'NOK', content_name: req.body.content_name, content_category: req.body.content_category }, properties),
                event_source_url: (session === null || session === void 0 ? void 0 : session.path) || 'https://kampanje.dident.no',
                action_source: 'website'
            };
            console.log('Sending to Facebook:', JSON.stringify(fbEvent, null, 2));
            const response = await sendToFacebookAPI(fbEvent);
            console.log('Facebook API Response:', response);
            res.status(200).json({
                success: true,
                fbResponse: response
            });
        }
        catch (fbError) {
            console.error('Facebook API Error:', ((_a = fbError.response) === null || _a === void 0 ? void 0 : _a.data) || fbError);
            res.status(200).json({
                success: true,
                fbError: ((_b = fbError.response) === null || _b === void 0 ? void 0 : _b.data) || fbError.message
            });
        }
    }
    catch (error) {
        console.error('Tracking error:', error);
        res.status(500).json({
            error: 'Failed to track conversion',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
router.post('/', handleTracking);
exports.trackConversionRouter = router;
