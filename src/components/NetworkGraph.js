import React from 'react';

export default function NetworkGraph() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <iframe
        src="/geobias_network_graph.html"
        width="100%"
        height="600"
        style={{ border: 'none' }}
        title="Network Graph"
      />
    </div>
  );
}