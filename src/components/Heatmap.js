import React from 'react';
import Plot from 'react-plotly.js';

export default function Heatmap({ data, layoutProps = {}, configProps = {} }) {
  if (!data || data.length === 0) return null;

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
    <div style={{ width: '100%', height: 'auto' }}>
      <Plot
        data={[
          {
            z,
            x: targets,
            y: sources,
            type: 'heatmap',
            colorscale: 'RdBu',
            reversescale: true,
            zmid: 0,
            hoverongaps: false
          }
        ]}
        layout={{
          autosize: true,
          margin: { t: 30, b: 40, l: 100, r: 40 },
          hovermode: 'closest',
          paper_bgcolor: '#ffffff',
          plot_bgcolor: '#ffffff',
          ...layoutProps
        }}
        config={{
          displayModeBar: false,
          responsive: true,
          scrollZoom: false,
          staticPlot: false,
          ...configProps
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
