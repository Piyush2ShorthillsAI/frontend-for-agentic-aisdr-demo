import React, { useState, useEffect } from 'react';
import { Mail, MousePointerClick, MessageSquare, Users, TrendingUp, Calendar } from 'lucide-react';
import MetricCard from '../components/UI/MetricCard';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import Button from '../components/UI/Button';
import insightsService from '../services/insightsService';
import { formatPercentage, formatWithCommas, getDateRangePreset } from '../utils/formatters';
import './Dashboard.css';

/**
 * Main Dashboard Page
 */
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overview, setOverview] = useState(null);
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [dateRange, setDateRange] = useState('week');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const dates = getDateRangePreset(dateRange);
      
      const [overviewData, campaignsData] = await Promise.all([
        insightsService.getOverview(dates),
        insightsService.getTopCampaigns({ ...dates, metric: 'open_rate', limit: 5 })
      ]);

      setOverview(overviewData);
      setTopCampaigns(campaignsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  if (loading && !overview) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (error && !overview) {
    return <ErrorMessage message={error} retry={fetchData} />;
  }

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 90 Days' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard Overview</h1>
          <p className="dashboard__subtitle">
            Comprehensive analytics for your email campaigns
          </p>
        </div>
        <div className="dashboard__actions">
          <select 
            className="dashboard__date-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="dashboard__metrics">
        <MetricCard
          title="Emails Sent"
          value={formatWithCommas(overview?.totals?.emails_sent || 0)}
          subtitle={`${formatWithCommas(overview?.totals?.unique_recipients || 0)} recipients`}
          icon={<Mail />}
          color="primary"
        />
        <MetricCard
          title="Open Rate"
          value={formatPercentage(overview?.rates?.open_rate || 0)}
          subtitle={`${formatWithCommas(overview?.engagement?.unique_opens || 0)} unique opens`}
          icon={<TrendingUp />}
          color="success"
        />
        <MetricCard
          title="Click Rate"
          value={formatPercentage(overview?.rates?.click_rate || 0)}
          subtitle={`${formatWithCommas(overview?.engagement?.unique_clicks || 0)} unique clicks`}
          icon={<MousePointerClick />}
          color="info"
        />
        <MetricCard
          title="Reply Rate"
          value={formatPercentage(overview?.rates?.reply_rate || 0)}
          subtitle={`${formatWithCommas(overview?.engagement?.replies || 0)} replies`}
          icon={<MessageSquare />}
          color="warning"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="dashboard__secondary-metrics">
        <div className="dashboard__stat-card">
          <div className="dashboard__stat-icon">
            <Users />
          </div>
          <div className="dashboard__stat-content">
            <div className="dashboard__stat-value">
              {formatWithCommas(overview?.totals?.campaigns || 0)}
            </div>
            <div className="dashboard__stat-label">Active Campaigns</div>
          </div>
        </div>
        
        <div className="dashboard__stat-card">
          <div className="dashboard__stat-icon">
            <Mail />
          </div>
          <div className="dashboard__stat-content">
            <div className="dashboard__stat-value">
              {formatWithCommas(overview?.totals?.senders || 0)}
            </div>
            <div className="dashboard__stat-label">Senders</div>
          </div>
        </div>
        
        <div className="dashboard__stat-card">
          <div className="dashboard__stat-icon">
            <TrendingUp />
          </div>
          <div className="dashboard__stat-content">
            <div className="dashboard__stat-value">
              {formatPercentage(overview?.rates?.click_to_open_rate || 0)}
            </div>
            <div className="dashboard__stat-label">Click-to-Open Rate</div>
          </div>
        </div>
        
        <div className="dashboard__stat-card">
          <div className="dashboard__stat-icon">
            <Calendar />
          </div>
          <div className="dashboard__stat-content">
            <div className="dashboard__stat-value">
              {overview?.scores?.engagement_score?.toFixed(1) || '0.0'}
            </div>
            <div className="dashboard__stat-label">Engagement Score</div>
          </div>
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <Card title="Top Performing Campaigns" subtitle="Based on open rate">
        <div className="dashboard__campaigns">
          {topCampaigns.length === 0 ? (
            <div className="dashboard__empty">No campaigns data available</div>
          ) : (
            <div className="dashboard__campaigns-table">
              <div className="dashboard__campaigns-header">
                <div className="dashboard__campaigns-col dashboard__campaigns-col--subject">Subject</div>
                <div className="dashboard__campaigns-col dashboard__campaigns-col--sent">Sent</div>
                <div className="dashboard__campaigns-col dashboard__campaigns-col--rate">Open Rate</div>
                <div className="dashboard__campaigns-col dashboard__campaigns-col--rate">Click Rate</div>
                <div className="dashboard__campaigns-col dashboard__campaigns-col--rate">Metric</div>
              </div>
              {topCampaigns.map((campaign) => (
                <div key={campaign.campaign_id} className="dashboard__campaigns-row">
                  <div className="dashboard__campaigns-col dashboard__campaigns-col--subject">
                    <div className="dashboard__campaigns-subject">
                      {campaign.subject || 'No Subject'}
                    </div>
                  </div>
                  <div className="dashboard__campaigns-col dashboard__campaigns-col--sent">
                    {formatWithCommas(campaign.emails_sent)}
                  </div>
                  <div className="dashboard__campaigns-col dashboard__campaigns-col--rate">
                    <span className="dashboard__campaigns-badge dashboard__campaigns-badge--success">
                      {formatPercentage(campaign.open_rate)}
                    </span>
                  </div>
                  <div className="dashboard__campaigns-col dashboard__campaigns-col--rate">
                    <span className="dashboard__campaigns-badge dashboard__campaigns-badge--info">
                      {formatPercentage(campaign.click_rate)}
                    </span>
                  </div>
                  <div className="dashboard__campaigns-col dashboard__campaigns-col--rate">
                    {formatPercentage(campaign.metric_value)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="dashboard__actions-grid">
        <Button variant="primary" fullWidth>
          Export Report
        </Button>
        <Button variant="outline" fullWidth>
          View All Campaigns
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;


