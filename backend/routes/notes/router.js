import { Router } from 'express';
import add from './add.js';
import { getToken } from '../../config/jwt.js';

const router = Router();

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  const verified = getToken(token);
  if (!verified) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

router.use(authMiddleware);
router.post('/add', add);

export default router;
