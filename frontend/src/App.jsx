import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import SenderPerformance from './pages/SenderPerformance';
import CampaignAnalytics from './pages/CampaignAnalytics';
import FunnelAnalysis from './pages/FunnelAnalysis';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/sender-performance" element={<Layout><SenderPerformance /></Layout>} />
        <Route path="/campaign-analytics" element={<Layout><CampaignAnalytics /></Layout>} />
        <Route path="/funnel-analysis" element={<Layout><FunnelAnalysis /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;


