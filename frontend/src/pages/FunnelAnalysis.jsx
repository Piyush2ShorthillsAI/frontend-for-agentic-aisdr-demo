import React, { useState, useEffect } from 'react';
import { TrendingDown, Filter } from 'lucide-react';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import FunnelChart from '../components/Charts/FunnelChart';
import insightsService from '../services/insightsService';
import { formatPercentage, formatWithCommas, getDateRangePreset } from '../utils/formatters';
import './FunnelAnalysis.css';

/**
 * Funnel Analysis Page
 */
const FunnelAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [funnelData, setFunnelData] = useState(null);
  const [dateRange, setDateRange] = useState('month');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const dates = getDateRangePreset(dateRange);
      const data = await insightsService.getFunnelAnalysis(dates);
      setFunnelData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  if (loading && !funnelData) {
    return <LoadingSpinner text="Loading funnel analysis..." />;
  }

  if (error && !funnelData) {
    return <ErrorMessage message={error} retry={fetchData} />;
  }

  const dateRangeOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 90 Days' },
  ];

  return (
    <div className="funnel-analysis">
      <div className="funnel-analysis__header">
        <div>
          <h1 className="funnel-analysis__title">Funnel Analysis</h1>
          <p className="funnel-analysis__subtitle">
            Track lead progression through conversion stages
          </p>
        </div>
        <div className="funnel-analysis__actions">
          <select 
            className="funnel-analysis__date-select"
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

      {/* Overall Conversion Rate */}
      {funnelData && (
        <div className="funnel-analysis__overview">
          <div className="funnel-analysis__overview-card">
            <div className="funnel-analysis__overview-icon">
              <Filter />
            </div>
            <div className="funnel-analysis__overview-content">
              <div className="funnel-analysis__overview-label">
                Overall Conversion Rate
              </div>
              <div className="funnel-analysis__overview-value">
                {formatPercentage(funnelData.overall_conversion_rate || 0)}
              </div>
              <div className="funnel-analysis__overview-description">
                From delivered to replied
              </div>
            </div>
          </div>

          <div className="funnel-analysis__overview-card">
            <div className="funnel-analysis__overview-icon">
              <TrendingDown />
            </div>
            <div className="funnel-analysis__overview-content">
              <div className="funnel-analysis__overview-label">
                Total Drop-Off
              </div>
              <div className="funnel-analysis__overview-value">
                {funnelData.drop_off && formatWithCommas(
                  funnelData.drop_off.delivered_to_opened +
                  funnelData.drop_off.opened_to_clicked +
                  funnelData.drop_off.clicked_to_replied
                )}
              </div>
              <div className="funnel-analysis__overview-description">
                Leads lost across all stages
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funnel Visualization */}
      <Card title="Conversion Funnel" subtitle="Lead progression through stages">
        <FunnelChart data={funnelData} />
      </Card>

      {/* Stage Details */}
      {funnelData && funnelData.stages && (
        <Card title="Stage Details" subtitle="In-depth metrics for each stage">
          <div className="funnel-analysis__stages">
            {funnelData.stages.map((stage, index) => (
              <div key={stage.stage} className="funnel-analysis__stage-card">
                <div className="funnel-analysis__stage-header">
                  <div className="funnel-analysis__stage-number">{index + 1}</div>
                  <div className="funnel-analysis__stage-info">
                    <h3 className="funnel-analysis__stage-title">{stage.stage}</h3>
                    <p className="funnel-analysis__stage-subtitle">
                      {index === 0 && "Initial email delivery"}
                      {index === 1 && "Recipients who opened the email"}
                      {index === 2 && "Recipients who clicked links"}
                      {index === 3 && "Recipients who replied"}
                    </p>
                  </div>
                </div>
                
                <div className="funnel-analysis__stage-metrics">
                  <div className="funnel-analysis__stage-metric">
                    <div className="funnel-analysis__stage-metric-label">Count</div>
                    <div className="funnel-analysis__stage-metric-value">
                      {formatWithCommas(stage.count)}
                    </div>
                  </div>
                  
                  <div className="funnel-analysis__stage-metric">
                    <div className="funnel-analysis__stage-metric-label">Percentage</div>
                    <div className="funnel-analysis__stage-metric-value">
                      {formatPercentage(stage.percentage)}
                    </div>
                  </div>
                  
                  {stage.conversion_rate !== null && index < funnelData.stages.length - 1 && (
                    <div className="funnel-analysis__stage-metric">
                      <div className="funnel-analysis__stage-metric-label">Conversion Rate</div>
                      <div className="funnel-analysis__stage-metric-value funnel-analysis__stage-metric-value--success">
                        {formatPercentage(stage.conversion_rate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Insights and Recommendations */}
      <Card title="Insights & Recommendations" subtitle="Based on your funnel data">
        <div className="funnel-analysis__insights">
          {funnelData && funnelData.stages && funnelData.stages.length > 0 && (
            <>
              {funnelData.stages[0]?.conversion_rate < 30 && (
                <div className="funnel-analysis__insight funnel-analysis__insight--warning">
                  <div className="funnel-analysis__insight-icon">⚠️</div>
                  <div className="funnel-analysis__insight-content">
                    <h4 className="funnel-analysis__insight-title">Low Open Rate</h4>
                    <p className="funnel-analysis__insight-text">
                      Your open rate is below 30%. Consider improving your subject lines and sender reputation.
                    </p>
                  </div>
                </div>
              )}
              
              {funnelData.stages[1]?.conversion_rate < 20 && (
                <div className="funnel-analysis__insight funnel-analysis__insight--info">
                  <div className="funnel-analysis__insight-icon">💡</div>
                  <div className="funnel-analysis__insight-content">
                    <h4 className="funnel-analysis__insight-title">Improve Click-Through Rate</h4>
                    <p className="funnel-analysis__insight-text">
                      Consider adding more compelling CTAs and value propositions in your email content.
                    </p>
                  </div>
                </div>
              )}
              
              {funnelData.overall_conversion_rate > 5 && (
                <div className="funnel-analysis__insight funnel-analysis__insight--success">
                  <div className="funnel-analysis__insight-icon">✅</div>
                  <div className="funnel-analysis__insight-content">
                    <h4 className="funnel-analysis__insight-title">Great Overall Conversion</h4>
                    <p className="funnel-analysis__insight-text">
                      Your overall conversion rate is strong! Keep up the good work with your current strategies.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FunnelAnalysis;


