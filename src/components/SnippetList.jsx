import React from 'react';
import SnippetCard from './SnippetCard';

const SnippetList = ({ snippets, onDelete, onEdit, searchTerm, selectedIndex }) => {
    if (snippets.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <h2>No snippets yet</h2>
                <p>Create your first snippet to get started!</p>
            </div>
        );
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
        }}>
            {snippets.map((snippet, index) => (
                <SnippetCard
                    key={snippet.id}
                    snippet={snippet}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    searchTerm={searchTerm}
                    isSelected={index === selectedIndex}
                />
            ))}
        </div>
    );
};

export default SnippetList;
