import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
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
  const [sortBy, setSortBy] = useState('metric');
  const [sortOrder, setSortOrder] = useState('desc');

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedCampaigns = [...topCampaigns].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'sent':
        aValue = a.emails_sent;
        bValue = b.emails_sent;
        break;
      case 'click_rate':
        aValue = a.click_rate;
        bValue = b.click_rate;
        break;
      case 'open_rate':
        aValue = a.open_rate;
        bValue = b.open_rate;
        break;
      case 'date':
        aValue = new Date(a.created_at || 0);
        bValue = new Date(b.created_at || 0);
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

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
          {/* All Campaigns Table */}
          <Card title="All Emails" subtitle={`Ranked by ${getMetricLabel(metric).toLowerCase()}`}>
            <div className="campaign-analytics__table-container">
              <div className="campaign-analytics__table">
                <div className="campaign-analytics__table-header">
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--subject">
                    <span>Subject</span>
                  </div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--number campaign-analytics__table-col--sortable" onClick={() => handleSort('sent')}>
                    <span>Sent</span>
                    <div className="campaign-analytics__sort-arrows">
                      <ArrowUp className={`campaign-analytics__arrow ${sortBy === 'sent' && sortOrder === 'asc' ? 'active' : ''}`} />
                      <ArrowDown className={`campaign-analytics__arrow ${sortBy === 'sent' && sortOrder === 'desc' ? 'active' : ''}`} />
                    </div>
                  </div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--rate campaign-analytics__table-col--sortable" onClick={() => handleSort('click_rate')}>
                    <span>Click Rate</span>
                    <div className="campaign-analytics__sort-arrows">
                      <ArrowUp className={`campaign-analytics__arrow ${sortBy === 'click_rate' && sortOrder === 'asc' ? 'active' : ''}`} />
                      <ArrowDown className={`campaign-analytics__arrow ${sortBy === 'click_rate' && sortOrder === 'desc' ? 'active' : ''}`} />
                    </div>
                  </div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--rate campaign-analytics__table-col--sortable" onClick={() => handleSort('open_rate')}>
                    <span>Open Rate</span>
                    <div className="campaign-analytics__sort-arrows">
                      <ArrowUp className={`campaign-analytics__arrow ${sortBy === 'open_rate' && sortOrder === 'asc' ? 'active' : ''}`} />
                      <ArrowDown className={`campaign-analytics__arrow ${sortBy === 'open_rate' && sortOrder === 'desc' ? 'active' : ''}`} />
                    </div>
                  </div>
                  <div className="campaign-analytics__table-col campaign-analytics__table-col--date campaign-analytics__table-col--sortable" onClick={() => handleSort('date')}>
                    <span>Date</span>
                    <div className="campaign-analytics__sort-arrows">
                      <ArrowUp className={`campaign-analytics__arrow ${sortBy === 'date' && sortOrder === 'asc' ? 'active' : ''}`} />
                      <ArrowDown className={`campaign-analytics__arrow ${sortBy === 'date' && sortOrder === 'desc' ? 'active' : ''}`} />
                    </div>
                  </div>
                </div>
                {sortedCampaigns.map((campaign, index) => (
                  <div key={campaign.campaign_id} className="campaign-analytics__table-row">
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--subject">
                      <div className="campaign-analytics__subject" title={campaign.subject || 'No Subject'}>
                        {campaign.subject || 'No Subject'}
                      </div>
                      <div className="campaign-analytics__campaign-id" title={campaign.campaign_id}>
                        {campaign.campaign_id.slice(0, 8)}...
                      </div>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--number">
                      {formatWithCommas(campaign.emails_sent)}
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">
                      <span className="campaign-analytics__badge campaign-analytics__badge--primary">
                        {formatPercentage(campaign.open_rate)}
                      </span>
                    </div>
                    <div className="campaign-analytics__table-col campaign-analytics__table-col--rate">
                      <span className="campaign-analytics__badge campaign-analytics__badge--primary">
                        {formatPercentage(campaign.click_rate)}
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


