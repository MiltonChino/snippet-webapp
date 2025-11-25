import React, { useState, useEffect, useRef } from 'react';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';

function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('snippets');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);

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

  const saveSnippets = () => {
    const blob = new Blob([JSON.stringify(snippets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snippets.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSnippets = JSON.parse(e.target.result);
        if (Array.isArray(importedSnippets)) {
          // Append new snippets, potentially you might want to check for duplicates or generate new IDs
          // For now, we just append them as requested.
          // We should probably ensure they have unique IDs if the source had IDs that conflict.
          // But for simplicity and per "append" instruction, we just add them.
          // A safer way is to regenerate IDs or check, but let's stick to simple append.
          setSnippets(prevSnippets => [...prevSnippets, ...importedSnippets]);
          alert(`Successfully imported ${importedSnippets.length} snippets.`);
        } else {
          alert('Invalid file format: The file must contain an array of snippets.');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Error importing snippets: Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset file input so the same file can be selected again if needed
    event.target.value = '';
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

        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button
            className="btn"
            onClick={handleImportClick}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            Import Snippets
          </button>
          <button
            className="btn"
            onClick={saveSnippets}
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
          >
            Save Snippets
          </button>
          <button
            className="btn"
            onClick={() => setIsFormOpen(true)}
            style={{ display: isFormOpen ? 'none' : 'flex' }}
          >
            + New Snippet
          </button>
        </div>
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
