"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadsRouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const hash_1 = require("../utils/hash");
const router = (0, express_1.Router)();
exports.leadsRouter = router;
const sendToFacebookAPI = async (event) => {
    try {
        await axios_1.default.post(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`, {
            data: [event],
            access_token: process.env.FB_ACCESS_TOKEN,
            test_event_code: process.env.NODE_ENV === 'development' ? 'TEST62496' : undefined
        });
    }
    catch (error) {
        console.error('Facebook API Error:', error);
    }
};
router.post('/', async (req, res) => {
    try {
        // Send to GoHighLevel
        const ghlResponse = await axios_1.default.post('https://rest.gohighlevel.com/v1/contacts/', {
            email: req.body.email,
            phone: req.body.phone,
            firstName: req.body.firstName,
            tags: ["bleking kampanje"],
            source: req.body.source,
            customField: {
                campaign: req.body.campaign,
                landingPage: req.body.landingPage
            }
        }, {
            headers: {
                Authorization: `Bearer ${process.env.GHL_API_KEY}`
            }
        });
        // Send til Facebook CAPI
        await sendToFacebookAPI({
            event_name: 'Lead',
            event_id: Date.now().toString(),
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
                em: (0, hash_1.hashData)(req.body.email),
                ph: (0, hash_1.hashData)(req.body.phone),
                client_ip_address: req.ip || '127.0.0.1',
                client_user_agent: req.headers['user-agent'] || 'Unknown'
            },
            custom_data: {
                value: 1995.00,
                currency: 'NOK'
            },
            event_source_url: req.body.landingPage || 'https://kampanje.dident.no/tilbud/bleking'
        });
        res.json({ success: true, data: ghlResponse.data });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: (error === null || error === void 0 ? void 0 : error.message) || 'Unknown error'
        });
    }
});
