import React from 'react';

export default function SankeyDiagram() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <iframe
        src="/geobias_sankey.html"
        width="100%"
        height="600"
        style={{ border: 'none' }}
        title="Sankey Diagram"
      />
    </div>
  );
}