import express from 'express';
import {Request, Response} from 'express';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  return res.status(200).json('Hello world');
});

export default router;
