import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist';

const Plot = createPlotlyComponent(Plotly);

export default function Heatmap({ data, layoutProps = {}, configProps = {} }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready || !data || data.length === 0) return null;

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
            hoverongaps: false,
            hovertemplate: '%{y} → %{x}<br>Sentiment: %{z:.3f}<extra></extra>'
          }
        ]}
        layout={{
          ...layoutProps,
          margin: { t: 20, b: 120, l: 120, r: 10 },
          height: 600,
          autosize: true,
          xaxis: {
            automargin: true,
            tickangle: -45,
            tickfont: { size: 10 }
          },
          yaxis: {
            automargin: true,
            tickfont: { size: 10 }
          },
          hoverlabel: {
            bgcolor: '#FFF',
            font: {
              color: '#000',
              size: 12,
              family: 'Inter, sans-serif'
            }
          },
          paper_bgcolor: '#fff',
          plot_bgcolor: '#fff'
        }}
        config={{
          displayModeBar: true,
          scrollZoom: false,
          responsive: true,
          ...configProps
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
