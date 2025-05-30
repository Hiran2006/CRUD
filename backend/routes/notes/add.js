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
    const { rows } = await db.query(
      'select note_id from notes where user_id = $1  order by created_at desc',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No notes found for this user' });
    }
    return res
      .status(200)
      .json({ message: 'Note added successfully', note_id: rows[0].note_id });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
