import React, { useEffect } from 'react';
import axios from 'axios';

type Note = {
  note_text: string;
  note_id: number;
};

function Dashboard() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [input, setInput] = React.useState('');

  useEffect(() => {
    axios
      .get('/api/data/notes/get')
      .then(res => {
        setNotes(res.data);
      })
      .catch(() => setNotes([]));
  }, []);

  const addNote = async () => {
    if (input.trim()) {
      const result = await axios.post('/api/data/notes/add', { note: input });
      if (result.status === 200) {
        setNotes([
          ...notes,
          { note_text: input, note_id: result.data.note_id },
        ]);
        setInput('');
      }
    }
  };

  const deleteNote = async (index: number) => {
    await axios.delete(
      '/api/data/notes/delete?note_id=' + notes[index].note_id
    );
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
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
        <textarea
          value={input}
          onChange={e => {
            setInput(e.target.value);
            const target = e.target as HTMLTextAreaElement;
            target.style.height = '40px';
            target.style.height = `${target.scrollHeight}px`;
          }}
          placeholder="Write a note..."
          style={{
            flex: 1,
            padding: 8,
            resize: 'none',
            minHeight: 40,
            maxHeight: 200,
            overflowY: 'auto',
            lineHeight: 1.5,
          }}
          rows={1}
          ref={el => {
            if (el) {
              el.style.height = '40px';
              el.style.height = `${el.scrollHeight}px`;
            }
          }}
        />
        <button
          onClick={() => {
            addNote();
            // Reset textarea height after adding
            const textarea = document.querySelector(
              'textarea'
            ) as HTMLTextAreaElement | null;
            if (textarea) {
              textarea.style.height = '40px';
              textarea.style.height = `${textarea.scrollHeight}px`;
            }
          }}
          style={{ padding: '8px 16px' }}
        >
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
              wordBreak: 'break-word',
              minHeight: 40,
            }}
          >
            <span style={{ flex: 1, overflowWrap: 'break-word' }}>
              {note.note_text}
            </span>
            <button
              onClick={() => deleteNote(idx)}
              style={{
                background: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 8px',
                cursor: 'pointer',
                marginLeft: 8,
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
