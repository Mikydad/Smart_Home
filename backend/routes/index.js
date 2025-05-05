// routes/index.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Backend is running');
});

export default router;
