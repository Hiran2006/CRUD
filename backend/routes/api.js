import express from 'express';
import userRoutes from './user/route.js';
import notesRoutes from './notes/router.js';
const router = express.Router();

router.use('/user', userRoutes);
router.use('/data/notes', notesRoutes);

export default router;
