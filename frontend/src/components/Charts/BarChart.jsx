import React from 'react';
import './BarChart.css';

const BarChart = ({ data, height = 300 }) => {
  if (!data || data.length === 0) {
    return <div className="bar-chart__empty">No data available</div>;
  }

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bar-chart" style={{ height: `${height}px` }}>
      <div className="bar-chart__bars">
        {data.map((item, index) => {
          const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          
          return (
            <div key={index} className="bar-chart__bar-wrapper">
              <div className="bar-chart__bar-container">
                <div 
                  className="bar-chart__bar"
                  style={{ height: `${percentage}%` }}
                  title={`${item.label}: ${item.value}`}
                >
                  <span className="bar-chart__value">{item.value}</span>
                </div>
              </div>
              <div className="bar-chart__label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
