import express from 'express';
import db from '../config/db.js';
import { setToken, getToken } from '../config/jwt.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, pass, name } = req.body;
  if (!email || !pass || !name) {
    return res
      .status(400)
      .json({ error: 'Email,Name and password are required' });
  }
  try {
    const { rows } = await db.query('select * from users where email = $1', [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashPass = await bcrypt.hash(pass, 10);
    if (hashPass) {
      await db.query(
        'insert into users (email, password, name) values ($1, $2, $3)',
        [email, hashPass, name]
      );
      return res.status(201).json({ message: 'User created successfully' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

export default router;
