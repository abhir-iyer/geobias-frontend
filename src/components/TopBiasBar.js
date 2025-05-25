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

  const labels = top10.map(d => `${d.source_country} → ${d.target_country}`);
  const sentiments = top10.map(d => d.avg_sentiment);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Plot
        data={[{
          x: labels,
          y: sentiments,
          type: 'bar',
          marker: {
            color: sentiments.map(val => val >= 0 ? '#4caf50' : '#f44336')
          },
          text: sentiments.map(val => `Sentiment: ${val.toFixed(3)}`),
          hoverinfo: 'text+x+y'
        }]}
        layout={{
          ...layoutProps,
          margin: { t: 30, b: 100, l: 60, r: 10 },
          height: 420,
          autosize: true,
          paper_bgcolor: '#fff',
          plot_bgcolor: '#fff',
          xaxis: {
            tickangle: -45,
            tickfont: { size: 11 },
            automargin: true
          },
          yaxis: {
            title: 'Avg Sentiment',
            automargin: true
          }
        }}
        config={{
          displayModeBar: false,
          scrollZoom: false,
          responsive: true,
          ...configProps
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
