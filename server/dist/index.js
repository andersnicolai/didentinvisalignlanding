"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const leads_1 = require("./routes/leads");
const track_conversion_1 = require("./routes/track-conversion");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Origin', 'X-Requested-With']
}));
app.use(express_1.default.json());
// Legg til debugging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.get('/api/health', (req, res) => {
    console.log('Health check endpoint hit');
    res.json({ status: 'API is running' });
});
app.use('/api/track-conversion', track_conversion_1.trackConversionRouter);
app.use('/api/leads', leads_1.leadsRouter);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Available routes:');
    console.log('- GET  /api/health');
    console.log('- POST /api/track-conversion');
    console.log('- POST /api/leads');
});
