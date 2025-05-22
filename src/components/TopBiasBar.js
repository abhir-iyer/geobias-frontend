import React from 'react';
import Plot from 'react-plotly.js';

export default function TopBiasBar({ data, layoutProps = {}, configProps = {} }) {
  if (!data || data.length === 0) return null;

  const sorted = [...data].sort((a, b) => Math.abs(b.avg_sentiment) - Math.abs(a.avg_sentiment));
  const top10 = sorted.slice(0, 10);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Plot
        data={[
          {
            x: top10.map(d => `${d.source_country} → ${d.target_country}`),
            y: top10.map(d => d.avg_sentiment),
            type: 'bar',
            text: top10.map(d =>
              `Source: ${d.source_country}<br>Target: ${d.target_country}<br>Sentiment: ${d.avg_sentiment.toFixed(3)}`
            ),
            hoverinfo: 'text',
            marker: { color: 'mediumseagreen' }
          }
        ]}
        layout={{
          margin: { t: 30, b: 80, l: 60, r: 30 },
          yaxis: { title: 'Avg Sentiment' },
          xaxis: {
            title: 'Country Pair',
            tickangle: -45
          },
          autosize: true,
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
