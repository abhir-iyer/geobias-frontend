import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist';

const Plot = createPlotlyComponent(Plotly);

export default function TopBiasBar({ data, layoutProps = {}, configProps = {} }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready || !data || data.length === 0) return null;

  const sorted = [...data].sort((a, b) => Math.abs(b.avg_sentiment) - Math.abs(a.avg_sentiment));
  const top10 = sorted.slice(0, 10);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Plot
        data={[{
          x: top10.map(d => `${d.source_country} → ${d.target_country}`),
          y: top10.map(d => d.avg_sentiment),
          type: 'bar',
          marker: {
            color: top10.map(d => d.avg_sentiment >= 0 ? '#4caf50' : '#f44336')
          },
          text: top10.map(d => `Sentiment: ${d.avg_sentiment.toFixed(3)}`),
          hoverinfo: 'text+x+y'
        }]}
        layout={{
          ...layoutProps,
          margin: { t: 20, b: 80, l: 60, r: 10 },
          height: 400,
          autosize: true,
          paper_bgcolor: '#fff',
          plot_bgcolor: '#fff',
          hoverlabel: {
            bgcolor: '#fff',
            bordercolor: '#ccc',
            font: { color: '#000', size: 12, family: 'Inter, sans-serif' }
          },
          xaxis: {
            tickangle: -30,
            automargin: true
          }
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
