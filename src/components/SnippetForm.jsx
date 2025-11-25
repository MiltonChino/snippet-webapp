import React, { useState, useEffect } from 'react';

const SnippetForm = ({ onSave, onCancel, initialData }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setTags(initialData.tags.join(', '));
        } else {
            setTitle('');
            setContent('');
            setTags('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const snippet = {
            id: initialData ? initialData.id : Date.now().toString(),
            title,
            content,
            tags: tags.split(',').map(t => t.trim()).filter(t => t),
            createdAt: initialData ? initialData.createdAt : new Date().toISOString()
        };

        onSave(snippet);
        setTitle('');
        setContent('');
        setTags('');
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{initialData ? 'Edit Snippet' : 'Add New Snippet'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., React Component Boilerplate"
                        autoFocus
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Paste your code or text here..."
                        rows={6}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g., react, javascript, hook"
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn">
                        {initialData ? 'Update Snippet' : 'Save Snippet'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn"
                        style={{ background: 'transparent', border: '1px solid var(--border-color)' }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SnippetForm;
