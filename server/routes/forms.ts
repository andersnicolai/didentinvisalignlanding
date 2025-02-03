import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/submit-form', async (req, res) => {
  try {
    const formData = new URLSearchParams();
    formData.append('entry.1305713745', req.body.name);
    formData.append('entry.323810053', req.body.email);
    formData.append('entry.1561425906', req.body.phone);
    formData.append('entry.1779318001', req.body.date);
    formData.append('entry.1479501297', req.body.time);

    await axios.post(
      'https://docs.google.com/forms/d/e/1FAIpQLSec7las55qWWGg4mTsfzji6dEJt4UOV_xv1EutXMHKywhM5tA/formResponse',
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({ success: false, error: 'Form submission failed' });
  }
});

export default router; 