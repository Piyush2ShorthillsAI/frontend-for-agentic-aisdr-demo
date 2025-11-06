/**
 * Utility functions for formatting data
 */

/**
 * Format number as percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0.0%';
  }
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} value - Value to format
 * @returns {string} Formatted number
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};

/**
 * Format number with commas
 * @param {number} value - Value to format
 * @returns {string} Formatted number
 */
export const formatWithCommas = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0';
  }
  return value.toLocaleString();
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    time: { hour: '2-digit', minute: '2-digit' }
  };
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Get trend indicator
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {Object} Trend object with direction and percentage
 */
export const getTrend = (current, previous) => {
  if (!previous || previous === 0) {
    return { direction: 'neutral', percentage: 0 };
  }
  
  const change = ((current - previous) / previous) * 100;
  
  return {
    direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
    percentage: Math.abs(change),
    value: change
  };
};

/**
 * Get color for metric value
 * @param {number} value - Metric value
 * @param {string} type - Metric type
 * @returns {string} Color class
 */
export const getMetricColor = (value, type = 'default') => {
  if (type === 'percentage') {
    if (value >= 75) return 'success';
    if (value >= 50) return 'warning';
    return 'danger';
  }
  
  if (type === 'rate') {
    if (value >= 30) return 'success';
    if (value >= 15) return 'warning';
    return 'danger';
  }
  
  return 'default';
};

/**
 * Calculate engagement score
 * @param {Object} metrics - Metrics object
 * @returns {number} Engagement score (0-100)
 */
export const calculateEngagementScore = (metrics) => {
  const { open_rate = 0, click_rate = 0, reply_rate = 0 } = metrics;
  
  // Weighted average: opens (40%), clicks (35%), replies (25%)
  const score = (open_rate * 0.4) + (click_rate * 0.35) + (reply_rate * 0.25);
  
  return Math.min(Math.round(score), 100);
};

/**
 * Get date range preset
 * @param {string} preset - Preset name ('today', 'week', 'month', 'quarter', 'year')
 * @returns {Object} Date range object
 */
export const getDateRangePreset = (preset) => {
  const end = new Date();
  const start = new Date();
  
  switch (preset) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(start.getDate() - 7);
      break;
    case 'month':
      start.setMonth(start.getMonth() - 1);
      break;
    case 'quarter':
      start.setMonth(start.getMonth() - 3);
      break;
    case 'year':
      start.setFullYear(start.getFullYear() - 1);
      break;
    default:
      start.setDate(start.getDate() - 7);
  }
  
  return {
    start_date: start.toISOString().split('T')[0],
    end_date: end.toISOString().split('T')[0]
  };
};


