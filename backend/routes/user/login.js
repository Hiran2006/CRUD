import { Router } from 'express';
import { setToken } from '../../config/jwt.js';
import db from '../../config/db.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const isValidPass = await bcrypt.compare(pass, user.rows[0].password);

    if (user.rows.length === 0 || !isValidPass) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = setToken(user.rows[0].id);
    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }
    return res
      .status(200)
      .cookie('token', token)
      .json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
