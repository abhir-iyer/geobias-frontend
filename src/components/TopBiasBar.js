import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';

const Plot = createPlotlyComponent(Plotly);

export default function TopBiasBar({ data, layoutProps = {}, configProps = {} }) {
  if (!data || data.length === 0) return null;

  const sorted = [...data].sort((a, b) => Math.abs(b.avg_sentiment) - Math.abs(a.avg_sentiment));
  const top10 = sorted.slice(0, 10);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Plot
        data={[{
          x: top10.map(d => `${d.source_country} → ${d.target_country}`),
          y: top10.map(d => d.avg_sentiment),
          type: 'bar',
          marker: { color: top10.map(d => d.avg_sentiment >= 0 ? '#4caf50' : '#f44336') },
        }]}
        layout={{
          ...layoutProps,
          margin: { t: 30, b: 40, l: 50, r: 10 },
          height: 400,
          paper_bgcolor: '#fff',
          plot_bgcolor: '#fff'
        }}
        config={{
          displayModeBar: false,
          scrollZoom: false,
          ...configProps
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
