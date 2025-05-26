import db from '../../config/db.js';
import { getToken } from '../../config/jwt.js';
export default async (req, res) => {
  const { note } = req.body;
  if (!note) {
    res.status(401).json({ error: 'Note is required' });
  }
  try {
    const id = getToken(req.cookies.token);
    await db.query('INSERT INTO notes (user_id,note_text) VALUES ($1,$2)', [
      id,
      note,
    ]);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
