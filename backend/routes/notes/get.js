import db from '../../config/db.js';
import { getToken } from '../../config/jwt.js';

// Function to fetch all notes
const getNotes = async (req, res) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify and decode token
    const id = getToken(token);
    if (!id) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // You can use user details here if needed
    const { rows } = await db.query(
      'SELECT note_id,note_text FROM notes where user_id = $1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).end();
    }
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
    console.error('Error fetching notes:', err);
  }
};

export default getNotes;
