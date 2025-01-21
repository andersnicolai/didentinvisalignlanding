import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { event, params, timestamp, url } = req.body;
    
    // TODO: Implementer logging til database
    console.log('Event tracked:', { event, params, timestamp, url });
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error?.message || 'Unknown error'
    });
  }
});

export { router as trackingRouter }; 