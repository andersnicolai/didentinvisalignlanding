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
const sendToFacebookAPI = async (event) => {
    try {
        console.log('Sending to Facebook API:', event);
        const response = await axios_1.default.post(`https://graph.facebook.com/v18.0/${process.env.FB_PIXEL_ID}/events`, {
            data: [event],
            access_token: process.env.FB_ACCESS_TOKEN,
            partner_agent: "dident_capi_nodejs",
            test_event_code: process.env.NODE_ENV === 'development' ? 'TEST58068' : undefined
        });
        console.log('Facebook API Response:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Facebook API Error:', error);
        throw error;
    }
};
const handleLead = async (req, res, next) => {
    try {
        console.log('Received lead:', req.body);
        if (!process.env.FB_ACCESS_TOKEN) {
            console.error('FB_ACCESS_TOKEN is missing');
            res.status(500).json({ error: 'FB_ACCESS_TOKEN is not configured' });
            return;
        }
        try {
            const fbEvent = {
                event_name: 'Lead',
                event_id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                event_time: Math.floor(Date.now() / 1000),
                user_data: {
                    em: (0, hash_1.hashData)(req.body.email),
                    ph: (0, hash_1.hashData)(req.body.phone),
                    client_ip_address: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
                    client_user_agent: req.headers['user-agent'] || 'Unknown',
                    fbc: req.body.fbc,
                    fbp: req.body.fbp
                },
                custom_data: {
                    value: 1200.00,
                    currency: 'NOK',
                    content_name: 'Tannlegekonsultasjon',
                    content_category: 'Dental Services',
                    content_type: 'service',
                    content_ids: ['tannlege_konsultasjon'],
                    delivery_category: 'in_person',
                    status: 'submitted',
                    service_type: 'konsultasjon',
                    is_free_service: false,
                    booking_date: req.body.date,
                    booking_time: req.body.time
                },
                event_source_url: req.body.landingPage || 'https://kampanje.dident.no',
                action_source: 'website'
            };
            await sendToFacebookAPI(fbEvent);
            res.status(200).json({ message: 'Lead received successfully' });
            return;
        }
        catch (fbError) {
            console.error('Facebook API Error:', fbError);
            res.status(200).json({
                message: 'Lead received but Facebook tracking failed',
                fbError: fbError.message
            });
            return;
        }
    }
    catch (error) {
        console.error('Error handling lead:', error);
        res.status(500).json({
            error: 'Failed to handle lead',
            details: error.message
        });
        return;
    }
};
router.post('/', handleLead);
exports.leadsRouter = router;
