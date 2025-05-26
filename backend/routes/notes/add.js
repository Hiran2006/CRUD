import db from '../../config/db.js';
export default async (req, res) => {
  const { note } = req.body;
  console.log('Adding note:', note);
  //   if (!note) {
  //     res.status(401).json({ error: 'Note is required' });
  //   }
  //   try {
  //     cons;
  //   } catch (error) {
  //     console.error('Error adding note:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
};
