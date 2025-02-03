"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const leads_1 = require("./routes/leads");
const tracking_1 = require("./routes/tracking");
const errorHandler_1 = require("./middleware/errorHandler");
const axios_1 = __importDefault(require("axios"));
const forms_1 = __importDefault(require("./routes/forms"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'https://kampanje.dident.no',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
    optionsSuccessStatus: 204,
    preflightContinue: false
};
// Pre-flight OPTIONS handling
app.options('*', (0, cors_1.default)(corsOptions));
// Enable CORS for all routes
app.use((0, cors_1.default)(corsOptions));
// Body parsing middleware
app.use(express_1.default.json());
// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'https://kampanje.dident.no');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
    next();
});
// Routes
app.use('/api/leads', leads_1.leadsRouter);
app.use('/api/track', tracking_1.trackingRouter);
app.use('/api', forms_1.default);
// Facebook Conversions API endpoint
app.post('/api/track-conversion', async (req, res) => {
    try {
        const { eventName, userData, customData } = req.body;
        const data = {
            data: [{
                    event_name: eventName,
                    event_time: Math.floor(Date.now() / 1000),
                    action_source: "website",
                    user_data: Object.assign(Object.assign({}, userData), { client_user_agent: req.headers['user-agent'], client_ip_address: req.ip }),
                    custom_data: customData
                }],
            access_token: process.env.FACEBOOK_ACCESS_TOKEN,
            pixel_id: process.env.FACEBOOK_PIXEL_ID,
        };
        const response = await axios_1.default.post(`https://graph.facebook.com/v17.0/${process.env.FACEBOOK_PIXEL_ID}/events`, data);
        res.json({ success: true, data: response.data });
    }
    catch (error) {
        console.error('Facebook Conversion API Error:', error);
        res.status(500).json({ success: false, error: 'Failed to track conversion' });
    }
});
// Error handling
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`CORS enabled for origin: ${process.env.CORS_ORIGIN || 'https://kampanje.dident.no'}`);
});
