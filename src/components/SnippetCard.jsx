import React, { useState } from 'react';

const SnippetCard = ({ snippet, onDelete, onEdit, searchTerm, isSelected }) => {
    const [copied, setCopied] = useState(false);

    const highlightText = (text, highlight) => {
        if (!highlight || !text) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ?
                <mark key={index} style={{ backgroundColor: 'rgba(255, 255, 0, 0.4)', color: 'inherit', padding: '0 2px', borderRadius: '2px' }}>{part}</mark> : part
        );
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(snippet.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
            transform: isSelected ? 'translateY(-2px)' : 'none',
            boxShadow: isSelected ? 'var(--shadow-lg), var(--glow)' : 'var(--shadow-sm)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                    {highlightText(snippet.title, searchTerm)}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={handleCopy}
                        className="btn-icon"
                        title="Copy to clipboard"
                    >
                        {copied ? '✓' : '📋'}
                    </button>
                    <button
                        onClick={() => onEdit(snippet)}
                        className="btn-icon"
                        title="Edit snippet"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(snippet.id)}
                        className="btn-icon"
                        title="Delete snippet"
                        style={{ color: '#ef4444' }}
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '1rem',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                color: '#e2e8f0'
            }}>
                {highlightText(snippet.content, searchTerm)}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {snippet.tags && snippet.tags.map((tag, index) => (
                    <span key={index} style={{
                        fontSize: '0.75rem',
                        background: 'rgba(139, 92, 246, 0.2)',
                        color: '#c4b5fd',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '999px'
                    }}>
                        #{highlightText(tag, searchTerm)}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SnippetCard;
