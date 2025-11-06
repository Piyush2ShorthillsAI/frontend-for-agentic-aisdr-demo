import React from 'react';
import './MetricCard.css';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue,
  className = '' 
}) => {
  return (
    <div className={`metric-card ${className}`}>
      <div className="metric-card__header">
        <div className="metric-card__title-section">
          <h3 className="metric-card__title">{title}</h3>
          {subtitle && <p className="metric-card__subtitle">{subtitle}</p>}
        </div>
        {icon && <div className="metric-card__icon">{icon}</div>}
      </div>
      
      <div className="metric-card__value">{value}</div>
      
      {(trend || trendValue) && (
        <div className={`metric-card__trend metric-card__trend--${trend}`}>
          {trend === 'up' && (
            <svg className="metric-card__trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="metric-card__trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          )}
          <span className="metric-card__trend-value">{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
