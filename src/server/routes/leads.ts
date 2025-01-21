import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // Send to GoHighLevel
    const ghlResponse = await axios.post(
      'https://rest.gohighlevel.com/v1/contacts/',
      {
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.firstName,
        tags: ["Bleking Kampanje"],
        source: req.body.source,
        customField: {
          campaign: req.body.campaign,
          landingPage: req.body.landingPage
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`
        }
      }
    );

    // Log lead i database
    // TODO: Implementer database logging

    res.json({ success: true, data: ghlResponse.data });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export { router as leadRouter }; 