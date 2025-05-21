import React from 'react';

export default function FilterPanel({ sources, targets, source, target, setSource, setTarget }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label><strong>Source Country:</strong> </label>
      <select value={source} onChange={e => setSource(e.target.value)}>
        <option>All</option>
        {sources.map(c => <option key={c}>{c}</option>)}
      </select>

      <label style={{ marginLeft: '1rem' }}><strong>Target Country:</strong> </label>
      <select value={target} onChange={e => setTarget(e.target.value)}>
        <option>All</option>
        {targets.map(c => <option key={c}>{c}</option>)}
      </select>
    </div>
  );
}