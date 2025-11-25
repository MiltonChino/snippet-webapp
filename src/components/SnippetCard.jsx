import React, { useState } from 'react';

const SnippetCard = ({ snippet, onDelete }) => {
    const [copied, setCopied] = useState(false);

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
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{snippet.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={handleCopy}
                        className="btn-icon"
                        title="Copy to clipboard"
                    >
                        {copied ? '✓' : '📋'}
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
                {snippet.content}
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
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SnippetCard;
