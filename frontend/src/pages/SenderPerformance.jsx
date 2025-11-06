import React, { useState, useEffect } from 'react';
import { Mail, TrendingUp, MousePointerClick } from 'lucide-react';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import BarChart from '../components/Charts/BarChart';
import insightsService from '../services/insightsService';
import { formatPercentage, formatWithCommas, getDateRangePreset } from '../utils/formatters';
import './SenderPerformance.css';

/**
 * Sender Performance Page
 */
const SenderPerformance = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [senders, setSenders] = useState([]);
  const [dateRange, setDateRange] = useState('week');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const dates = getDateRangePreset(dateRange);
      const sendersData = await insightsService.getSenderPerformance(dates);
      setSenders(sendersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  if (loading && senders.length === 0) {
    return <LoadingSpinner text="Loading sender performance..." />;
  }

  if (error && senders.length === 0) {
    return <ErrorMessage message={error} retry={fetchData} />;
  }

  const dateRangeOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 90 Days' },
  ];

  // Prepare chart data
  const chartData = senders.map(sender => ({
    name: sender.sender_email.split('@')[0],
    'Open Rate': sender.rates.open_rate,
    'Click Rate': sender.rates.click_rate,
    'CTR': sender.rates.click_to_open_rate
  }));

  return (
    <div className="sender-performance">
      <div className="sender-performance__header">
        <div>
          <h1 className="sender-performance__title">Sender Performance</h1>
          <p className="sender-performance__subtitle">
            Analyze performance metrics by sender
          </p>
        </div>
        <div className="sender-performance__actions">
          <select 
            className="sender-performance__date-select"
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

      {/* Performance Chart */}
      {senders.length > 0 && (
        <Card title="Performance Comparison" subtitle="Open rate, click rate, and click-to-open rate">
          <BarChart 
            data={chartData}
            xKey="name"
            bars={[
              { dataKey: 'Open Rate', name: 'Open Rate (%)', color: 'var(--color-success)' },
              { dataKey: 'Click Rate', name: 'Click Rate (%)', color: 'var(--color-info)' },
              { dataKey: 'CTR', name: 'Click-to-Open (%)', color: 'var(--color-warning)' }
            ]}
            height={350}
          />
        </Card>
      )}

      {/* Sender Details Table */}
      <Card title="Sender Details" subtitle="Comprehensive performance metrics">
        <div className="sender-performance__table-container">
          {senders.length === 0 ? (
            <div className="sender-performance__empty">No sender data available</div>
          ) : (
            <div className="sender-performance__table">
              <div className="sender-performance__table-header">
                <div className="sender-performance__table-col sender-performance__table-col--email">Sender</div>
                <div className="sender-performance__table-col sender-performance__table-col--number">Emails</div>
                <div className="sender-performance__table-col sender-performance__table-col--number">Recipients</div>
                <div className="sender-performance__table-col sender-performance__table-col--number">Campaigns</div>
                <div className="sender-performance__table-col sender-performance__table-col--rate">Open Rate</div>
                <div className="sender-performance__table-col sender-performance__table-col--rate">Click Rate</div>
                <div className="sender-performance__table-col sender-performance__table-col--rate">CTR</div>
              </div>
              {senders.map((sender) => (
                <div key={sender.sender_email} className="sender-performance__table-row">
                  <div className="sender-performance__table-col sender-performance__table-col--email">
                    <div className="sender-performance__email-wrapper">
                      <div className="sender-performance__email-avatar">
                        {sender.sender_email.charAt(0).toUpperCase()}
                      </div>
                      <div className="sender-performance__email-info">
                        <div className="sender-performance__email">{sender.sender_email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="sender-performance__table-col sender-performance__table-col--number">
                    {formatWithCommas(sender.metrics.emails_sent)}
                  </div>
                  <div className="sender-performance__table-col sender-performance__table-col--number">
                    {formatWithCommas(sender.metrics.unique_recipients)}
                  </div>
                  <div className="sender-performance__table-col sender-performance__table-col--number">
                    {formatWithCommas(sender.metrics.campaigns)}
                  </div>
                  <div className="sender-performance__table-col sender-performance__table-col--rate">
                    <span className="sender-performance__badge sender-performance__badge--success">
                      {formatPercentage(sender.rates.open_rate)}
                    </span>
                  </div>
                  <div className="sender-performance__table-col sender-performance__table-col--rate">
                    <span className="sender-performance__badge sender-performance__badge--info">
                      {formatPercentage(sender.rates.click_rate)}
                    </span>
                  </div>
                  <div className="sender-performance__table-col sender-performance__table-col--rate">
                    <span className="sender-performance__badge sender-performance__badge--warning">
                      {formatPercentage(sender.rates.click_to_open_rate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Summary Stats */}
      {senders.length > 0 && (
        <div className="sender-performance__summary">
          <div className="sender-performance__summary-card">
            <Mail className="sender-performance__summary-icon" />
            <div className="sender-performance__summary-content">
              <div className="sender-performance__summary-value">
                {formatWithCommas(senders.reduce((sum, s) => sum + s.metrics.emails_sent, 0))}
              </div>
              <div className="sender-performance__summary-label">Total Emails Sent</div>
            </div>
          </div>
          <div className="sender-performance__summary-card">
            <TrendingUp className="sender-performance__summary-icon" />
            <div className="sender-performance__summary-content">
              <div className="sender-performance__summary-value">
                {formatPercentage(
                  senders.reduce((sum, s) => sum + s.rates.open_rate, 0) / senders.length
                )}
              </div>
              <div className="sender-performance__summary-label">Average Open Rate</div>
            </div>
          </div>
          <div className="sender-performance__summary-card">
            <MousePointerClick className="sender-performance__summary-icon" />
            <div className="sender-performance__summary-content">
              <div className="sender-performance__summary-value">
                {formatPercentage(
                  senders.reduce((sum, s) => sum + s.rates.click_rate, 0) / senders.length
                )}
              </div>
              <div className="sender-performance__summary-label">Average Click Rate</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SenderPerformance;


