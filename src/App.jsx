import React, { useState, useEffect } from 'react';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';

function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('snippets');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = (snippet) => {
    setSnippets([snippet, ...snippets]);
    setIsFormOpen(false);
  };

  const deleteSnippet = (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      setSnippets(snippets.filter(s => s.id !== id));
    }
  };

  const filteredSnippets = snippets.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="app-container">
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Snippet Library
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Organize your code snippets efficiently</p>
        </div>

        <button
          className="btn"
          onClick={() => setIsFormOpen(true)}
          style={{ display: isFormOpen ? 'none' : 'flex' }}
        >
          + New Snippet
        </button>
      </header>

      {isFormOpen && (
        <SnippetForm
          onAdd={addSnippet}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search snippets by title or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '1rem',
            fontSize: '1rem',
            background: 'rgba(30, 41, 59, 0.4)'
          }}
        />
      </div>

      <SnippetList
        snippets={filteredSnippets}
        onDelete={deleteSnippet}
      />
    </div>
  );
}

export default App;
