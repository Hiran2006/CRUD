import { Router } from 'express';
import add from './add.js';

const router = Router();

router.post('/add', add);

export default router;
