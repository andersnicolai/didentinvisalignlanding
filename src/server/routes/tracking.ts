import { Router } from 'express';

const router = Router();

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
  } catch (error: any) {
    console.error('Tracking error:', error);
    res.status(500).json({ 
      success: false, 
      error: error?.message || 'Unknown error'
    });
  }
});

export { router as trackingRouter }; 