import React from 'react';
import Plot from 'react-plotly.js';

export default function Heatmap({ data }) {
  const pivot = {};
  data.forEach(row => {
    const src = row.source_country;
    const tgt = row.target_country;
    const val = row.avg_sentiment;
    if (!pivot[src]) pivot[src] = {};
    pivot[src][tgt] = val;
  });

  const sources = Object.keys(pivot);
  const targets = Array.from(new Set(data.map(r => r.target_country)));
  const z = sources.map(src => targets.map(tgt => pivot[src]?.[tgt] ?? null));

  return (
    <Plot
      data={[{
        z,
        x: targets,
        y: sources,
        type: 'heatmap',
        colorscale: 'RdBu',
        reversescale: true,
        zmid: 0,
      }]}
      layout={{
        title: 'Country-to-Country Sentiment Matrix',
        width: 900,
        height: 600
      }}
    />
  );
}