import React from 'react';
import Plot from 'react-plotly.js';

export default function TopBiasBar({ data }) {
  const sorted = [...data].sort((a, b) => Math.abs(b.avg_sentiment) - Math.abs(a.avg_sentiment));
  const top10 = sorted.slice(0, 10);

  return (
    <Plot
      data={[{
        x: top10.map(d => d.source_country),
        y: top10.map(d => d.avg_sentiment),
        type: 'bar',
        text: top10.map(d => d.target_country),
        marker: { color: 'teal' }
      }]}
      layout={{
        title: 'Top 10 Most Biased Country Pairs',
        width: 800,
        height: 400
      }}
    />
  );
}