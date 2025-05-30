import db from '../../config/db.js';

export default async function deleteNote(req, res) {
  const note_id = req.query.note_id;

  if (!note_id) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const result = await db.query('DELETE FROM notes WHERE note_id = $1', [
      note_id,
    ]);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
