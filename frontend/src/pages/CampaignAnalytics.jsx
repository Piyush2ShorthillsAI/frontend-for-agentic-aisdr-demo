import React, { useState, useEffect } from 'react';
import { Award, Mail, TrendingUp } from 'lucide-react';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import insightsService from '../services/insightsService';
import { formatPercentage, formatWithCommas, formatDate, getDateRangePreset } from '../utils/formatters';
import './CampaignAnalytics.css';

/**
 * Campaign Analytics Page
 */
const CampaignAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [metric, setMetric] = useState('open_rate');
  const [dateRange, setDateRange] = useState('month');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const dates = getDateRangePreset(dateRange);
      const campaignsData = await insightsService.getTopCampaigns({
        ...dates,
        metric,
        limit: 20
      });

      setTopCampaigns(campaignsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [metric, dateRange]);

  if (loading && topCampaigns.length === 0) {
    return <LoadingSpinner text="Loading campaign analytics..." />;
  }

  if (error && topCampaigns.length === 0) {
    return <ErrorMessage message={error} retry={fetchData} />;
  }

  const metricOptions = [
    { value: 'open_rate', label: 'Open Rate' },
    { value: 'click_rate', label: 'Click Rate' },
    { value: 'engagement_score', label: 'Engagement Score' },
  ];

  const dateRangeOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 90 Days' },
  ];

  const getMetricLabel = (metric) => {
    const option = metricOptions.find(o => o.value === metric);
    return option ? option.label : 'Metric';
  };

  const getRankBadgeClass = (index) => {
    if (index === 0) return 'campaign-analytics__rank--gold';
    if (index === 1) return 'campaign-analytics__rank--silver';
    if (index === 2) return 'campaign-analytics__rank--bronze';
    return '';
  };

  return (
    <div className="campaign-analytics">
      <div className="campaign-analytics__header">
        <div>
          <h1 className="campaign-analytics__title">Campaign Analytics</h1>
          <p className="campaign-analytics__subtitle">
            Top performing campaigns ranked by selected metric
          </p>
        </div>
        <div className="campaign-analytics__actions">
          <select 
            className="campaign-analytics__select"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            {metricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select 
            className="campaign-analytics__select"
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

      {topCampaigns.length === 0 ? (
        <Card>
          <div className="campaign-analytics__empty">
            No campaign data available for the selected period
          </div>
        </Card>
      ) : (
        <>
          {/* Top 3 Winners */}
          <div className="campaign-analytics__winners">
            {topCampaigns.slice(0, 3).map((campaign, index) => (
              <div key={campaign.campaign_id} className="campaign-analytics__winner-card">
                <div className={`campaign-analytics__rank ${getRankBadgeClass(index)}`}>
                  <Award />
                  <span>#{index + 1}</span>
                </div>
                <div className="campaign-analytics__winner-content">
                  <h3 className="campaign-analytics__winner-title">
                    {campaign.subject || 'No Subject'}
                  </h3>
                  <div className="campaign-analytics__winner-metric">
                    <span className="campaign-analytics__winner-metric-label">
                      {getMetricLabel(metric)}:
                    </span>
                    <span className="campaign-analytics__winner-metric-value">
                      {formatPercentage(campaign.metric_value)}
                    </span>
                  </div>
                  <div className="campaign-analytics__winner-stats">
                    <div className="campaign-analytics__winner-stat">
                      <Mail className="campaign-analytics__winner-stat-icon" />
                      <span>{formatWithCommas(campaign.emails_sent)} sent</span>
                    </div>
                    <div className="campaign-analytics__winner-stat">
                      <TrendingUp className="campaign-analytics__winner-stat-icon" />
                      <span>{formatPercentage(campaign.open_rate)} opened</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Campaigns Table */}
          <Card title="All Campaigns" subtitle={`Ranked by ${getMetricLabel(metric).toLowerCase()}`}>
            <div className="campaign-analytics__table-container">
              <div className="campaign-analytics__table">
                <div className="campaign-analytics__table-header">
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--rank">Rank</div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--subject">Subject</div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--number">Sent</div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">Open Rate</div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">Click Rate</div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">{getMetricLabel(metric)}</div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--date">Date</div>
                </div>
                {topCampaigns.map((campaign, index) => (
                  <div key={campaign.campaign_id} className="campaign-analytics__table-row">
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--rank">
                      <div className={`campaign-analytics__rank-badge ${getRankBadgeClass(index)}`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--subject">
                      <div className="campaign-analytics__subject">
                        {campaign.subject || 'No Subject'}
                      </div>
                      <div className="campaign-analytics__campaign-id">
                        {campaign.campaign_id.slice(0, 8)}...
                      </div>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--number">
                      {formatWithCommas(campaign.emails_sent)}
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">
                      <span className="campaign-analytics__badge campaign-analytics__badge--success">
                        {formatPercentage(campaign.open_rate)}
                      </span>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">
                      <span className="campaign-analytics__badge campaign-analytics__badge--info">
                        {formatPercentage(campaign.click_rate)}
                      </span>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">
                      <span className="campaign-analytics__badge campaign-analytics__badge--primary">
                        {formatPercentage(campaign.metric_value)}
                      </span>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--date">
                      {campaign.created_at ? formatDate(campaign.created_at) : 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default CampaignAnalytics;


