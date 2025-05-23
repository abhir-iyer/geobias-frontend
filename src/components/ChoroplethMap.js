import React from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-basic-dist';

const Plot = createPlotlyComponent(Plotly);

export default function ChoroplethMap({ data, layoutProps = {}, configProps = {} }) {
  if (!data || data.length === 0) return null;

  const byTarget = {};
  data.forEach(row => {
    const country = row.target_country;
    const sentiment = row.avg_sentiment;
    if (!byTarget[country]) {
      byTarget[country] = { total: sentiment, count: 1 };
    } else {
      byTarget[country].total += sentiment;
      byTarget[country].count += 1;
    }
  });

  const countryList = Object.keys(byTarget);
  const avgSentiment = countryList.map(c => byTarget[c].total / byTarget[c].count);
  const hoverText = countryList.map(
    c => `${c}<br>Avg Sentiment: ${(byTarget[c].total / byTarget[c].count).toFixed(3)}`
  );

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Plot
        data={[{
          type: 'choropleth',
          locationmode: 'country names',
          locations: countryList,
          z: avgSentiment,
          text: hoverText,
          hoverinfo: 'text',
          colorscale: 'RdBu',
          zmid: 0,
          showscale: true,
          colorbar: { title: 'Avg Sentiment' }
        }]}
        layout={{
          ...layoutProps,
          geo: { showframe: false },
          margin: { t: 10, b: 10, l: 0, r: 0 },
          autosize: true,
          height: 500,
          paper_bgcolor: '#fff',
          plot_bgcolor: '#fff'
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
