import React from 'react';
import { formatPercentage, formatWithCommas } from '../../utils/formatters';
import './FunnelChart.css';

/**
 * Funnel Chart Component
 * Displays conversion funnel with stages
 */
const FunnelChart = ({ data }) => {
  if (!data || !data.stages || data.stages.length === 0) {
    return <div className="funnel-chart__empty">No funnel data available</div>;
  }

  const maxCount = data.stages[0]?.count || 1;

  return (
    <div className="funnel-chart">
      <div className="funnel-chart__stages">
        {data.stages.map((stage, index) => {
          // Calculate width - if count is 0, show minimal bar (3%), otherwise calculate with min 8%
          let widthPercentage;
          if (stage.count === 0) {
            widthPercentage = 3; // Minimal bar for zero values
          } else {
            widthPercentage = Math.max((stage.count / maxCount) * 100, 8);
          }
          const isLast = index === data.stages.length - 1;
          
          return (
            <div key={stage.stage} className="funnel-chart__stage">
              <div className="funnel-chart__stage-header">
                <span className="funnel-chart__stage-label">{stage.stage}</span>
                <span className="funnel-chart__stage-count">{formatWithCommas(stage.count)}</span>
              </div>
              <div 
                className="funnel-chart__bar"
                style={{ width: `${widthPercentage}%` }}
              >
                <div className="funnel-chart__bar-fill"></div>
              </div>
              <div className="funnel-chart__metrics">
                <span className="funnel-chart__percentage">
                  {formatPercentage(stage.percentage)} of total
                </span>
                {!isLast && stage.conversion_rate !== null && (
                  <span className="funnel-chart__conversion">
                    {formatPercentage(stage.conversion_rate)} conversion
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {data.drop_off && (
        <div className="funnel-chart__dropoff">
          <h4 className="funnel-chart__dropoff-title">Drop-off Analysis</h4>
          <div className="funnel-chart__dropoff-items">
            <div className="funnel-chart__dropoff-item">
              <span className="funnel-chart__dropoff-label">Delivered → Opened:</span>
              <span className="funnel-chart__dropoff-value">
                {formatWithCommas(data.drop_off.delivered_to_opened)} dropped
              </span>
            </div>
            <div className="funnel-chart__dropoff-item">
              <span className="funnel-chart__dropoff-label">Opened → Clicked:</span>
              <span className="funnel-chart__dropoff-value">
                {formatWithCommas(data.drop_off.opened_to_clicked)} dropped
              </span>
            </div>
            <div className="funnel-chart__dropoff-item">
              <span className="funnel-chart__dropoff-label">Clicked → Replied:</span>
              <span className="funnel-chart__dropoff-value">
                {formatWithCommas(data.drop_off.clicked_to_replied)} dropped
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunnelChart;
