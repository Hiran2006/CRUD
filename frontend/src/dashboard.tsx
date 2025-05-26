import React, { useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [notes, setNotes] = React.useState<string[]>([]);
  const [input, setInput] = React.useState('');

  useEffect(() => {
    axios
      .get('/api/data/notes/get')
      .then(res => setNotes(res.data))
      .catch(() => setNotes([]));
  }, []);

  const addNote = () => {
    if (input.trim()) {
      const newNotes = [...notes, input];
      setNotes(newNotes);
      setInput('');
      axios.post('/api/data/notes/add', { note: input }).catch(() => {});
    }
  };

  const deleteNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    axios.post('/api/data/notes/delete', newNotes).catch(() => {});
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 8,
      }}
    >
      <h2>Note Taking App</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a note..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={addNote} style={{ padding: '8px 16px' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
              background: '#f9f9f9',
              padding: 8,
              borderRadius: 4,
            }}
          >
            <span>{note}</span>
            <button
              onClick={() => deleteNote(idx)}
              style={{
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
