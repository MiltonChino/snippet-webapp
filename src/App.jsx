import React, { useState, useEffect, useRef } from 'react';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';

function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('snippets');
    return saved ? JSON.parse(saved) : [];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [toastMessage, setToastMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const handleSaveSnippet = (snippet) => {
    if (editingSnippet) {
      setSnippets(snippets.map(s => s.id === snippet.id ? snippet : s));
      setEditingSnippet(null);
    } else {
      setSnippets([snippet, ...snippets]);
    }
    setIsFormOpen(false);
  };

  const handleEditClick = (snippet) => {
    setEditingSnippet(snippet);
    setIsFormOpen(true);
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
    s.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const selection = window.getSelection().toString();
        if (!selection) {
          let snippetToCopy = null;

          if (selectedIndex >= 0 && selectedIndex < filteredSnippets.length) {
            snippetToCopy = filteredSnippets[selectedIndex];
          } else if (filteredSnippets.length === 1) {
            snippetToCopy = filteredSnippets[0];
          }

          if (snippetToCopy) {
            e.preventDefault();
            try {
              await navigator.clipboard.writeText(snippetToCopy.content);
              setToastMessage('Snippet copied to clipboard!');
              setTimeout(() => setToastMessage(''), 2000);
            } catch (err) {
              console.error('Failed to copy:', err);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredSnippets, selectedIndex]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setSelectedIndex(prev =>
        prev < filteredSnippets.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
    }
  };

  return (
    <div className="app-container">
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--accent-primary)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {toastMessage}
        </div>
      )}
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

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div style={{ position: 'relative' }} ref={menuRef}>
            <button
              className="btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              More ▼
            </button>

            {isMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                minWidth: '150px',
                backdropFilter: 'blur(12px)'
              }}>
                <button
                  className="btn"
                  onClick={() => {
                    handleImportClick();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 0,
                    borderBottom: '1px solid var(--border-color)'
                  }}
                >
                  Import Snippets
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    saveSnippets();
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 0
                  }}
                >
                  Save Snippets
                </button>
              </div>
            )}
          </div>

          <button
            className="btn"
            onClick={() => {
              setEditingSnippet(null);
              setIsFormOpen(true);
            }}
            style={{ display: isFormOpen ? 'none' : 'flex' }}
          >
            + New Snippet
          </button>
        </div>
      </header>

      {isFormOpen && (
        <SnippetForm
          onSave={handleSaveSnippet}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingSnippet(null);
          }}
          initialData={editingSnippet}
        />
      )}

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search snippets by title or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
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
        onEdit={handleEditClick}
        searchTerm={searchTerm}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}

export default App;
