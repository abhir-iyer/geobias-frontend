import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

import FilterPanel from './components/FilterPanel';
import ChoroplethMap from './components/ChoroplethMap';
import Heatmap from './components/Heatmap';
import TopBiasBar from './components/TopBiasBar';
import NetworkGraph from './components/NetworkGraph';
import SankeyDiagram from './components/SankeyDiagram';
import Loader from './components/Loader'; // ✅ Add this component

import './App.css';

function App() {
  const [matrix, setMatrix] = useState([]);
  const [countries, setCountries] = useState({ sources: [], targets: [] });
  const [source, setSource] = useState('All');
  const [target, setTarget] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE = '/api'; // For Vercel proxy

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE}/countries`)
      .then(res => setCountries(res.data))
      .catch(err => console.error("Failed to load countries", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE}/filter/${source}/${target}`)
      .then(res => {
        setMatrix(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load matrix", err);
        setLoading(false);
      });
  }, [source, target]);

  const commonLayoutProps = {
    hovermode: 'closest',
    transition: { duration: 0 },
    hoverlabel: {
      bgcolor: '#FFF',
      bordercolor: '#AAA',
      font: { size: 12, family: 'Inter, sans-serif' }
    }
  };

  const commonConfigProps = {
    displayModeBar: true,
    staticPlot: false,
    responsive: true,
    scrollZoom: false
  };

  return (
    <>
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">🌐 GeoBias Dashboard</h1>
          <p className="intro">
            A visual exploration of how countries are portrayed in global media using sentiment analysis of news headlines.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="section lift-on-hover" data-aos="fade-up">
          <h2>🔍 Filter Country Pairs</h2>
          <FilterPanel
            sources={countries.sources}
            targets={countries.targets}
            source={source}
            target={target}
            setSource={setSource}
            setTarget={setTarget}
          />
        </div>

        {loading ? (
          <div className="section" data-aos="fade-up">
            <Loader />
          </div>
        ) : (
          <>
            <div className="section lift-on-hover" data-aos="fade-up">
              <h2>🌍 Sentiment Toward Target Countries (Choropleth)</h2>
              <p className="insight">See which countries are viewed positively or negatively around the world.</p>
              <ChoroplethMap data={matrix} layoutProps={commonLayoutProps} configProps={commonConfigProps} />
            </div>

            <div className="section lift-on-hover" data-aos="fade-up">
              <h2>🌡️ Source → Target Country Sentiment Matrix (Heatmap)</h2>
              <p className="insight">Hover to explore average sentiment between source and target countries.</p>
              <Heatmap data={matrix} layoutProps={commonLayoutProps} configProps={commonConfigProps} />
            </div>

            <div className="section lift-on-hover" data-aos="fade-up">
              <h2>📊 Top 10 Most Biased Country Pairs</h2>
              <p className="insight">Discover the country pairs with the most polarized sentiment in the dataset.</p>
              <TopBiasBar data={matrix} layoutProps={commonLayoutProps} configProps={commonConfigProps} />
            </div>
          </>
        )}

        <div className="section lift-on-hover" data-aos="fade-up">
          <h2>🕸️ Directed News Sentiment Network</h2>
          <p className="insight">Visualize the sentiment-driven relationships between countries in a network graph.</p>
          <NetworkGraph layoutProps={commonLayoutProps} configProps={commonConfigProps} />
        </div>

        <div className="section lift-on-hover" data-aos="fade-up">
          <h2>🔄 Country-to-Country Sentiment Flow (Sankey)</h2>
          <p className="insight">Track the directional sentiment flows between nations using a Sankey diagram.</p>
          <SankeyDiagram layoutProps={commonLayoutProps} configProps={commonConfigProps} />
        </div>
      </div>

      <button
        className={`back-to-top ${showScrollTop ? 'visible' : 'hidden'}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Back to Top
      </button>

      <footer className="footer">
        <p>Built by Abhir Iyer · GeoBias Project · 2025</p>
      </footer>
    </>
  );
}

export default App;
