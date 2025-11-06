import api from './api';

/**
 * Insights API Service
 * Handles all API calls related to analytics and insights
 */

class InsightsService {
  /**
   * Get overview metrics
   * @param {Object} params - Query parameters
   * @param {string} params.start_date - Start date (YYYY-MM-DD)
   * @param {string} params.end_date - End date (YYYY-MM-DD)
   * @param {string} params.campaign_ids - Comma-separated campaign IDs
   * @param {string} params.sender_email - Filter by sender email
   * @returns {Promise<Object>} Overview metrics
   */
  async getOverview(params = {}) {
    return api.get('/insights/overview', { params });
  }

  /**
   * Get sender performance metrics
   * @param {Object} params - Query parameters
   * @param {string} params.start_date - Start date (YYYY-MM-DD)
   * @param {string} params.end_date - End date (YYYY-MM-DD)
   * @returns {Promise<Array>} Sender performance data
   */
  async getSenderPerformance(params = {}) {
    return api.get('/insights/performance/sender', { params });
  }

  /**
   * Get funnel analysis
   * @param {Object} params - Query parameters
   * @param {string} params.start_date - Start date (YYYY-MM-DD)
   * @param {string} params.end_date - End date (YYYY-MM-DD)
   * @returns {Promise<Object>} Funnel analysis data
   */
  async getFunnelAnalysis(params = {}) {
    return api.get('/insights/funnel', { params });
  }

  /**
   * Get top performing campaigns
   * @param {Object} params - Query parameters
   * @param {string} params.metric - Metric to rank by (open_rate, click_rate, engagement_score)
   * @param {number} params.limit - Number of campaigns to return
   * @param {string} params.start_date - Start date (YYYY-MM-DD)
   * @param {string} params.end_date - End date (YYYY-MM-DD)
   * @returns {Promise<Array>} Top campaigns
   */
  async getTopCampaigns(params = {}) {
    return api.get('/insights/top-campaigns', { params });
  }

  /**
   * Get quick summary
   * @param {Object} params - Query parameters
   * @param {number} params.days - Number of days to look back
   * @returns {Promise<Object>} Quick summary
   */
  async getQuickSummary(params = { days: 7 }) {
    return api.get('/insights/summary', { params });
  }

  /**
   * Export insights data
   * @param {Object} params - Query parameters
   * @param {string} params.format - Export format (json or csv)
   * @param {string} params.start_date - Start date (YYYY-MM-DD)
   * @param {string} params.end_date - End date (YYYY-MM-DD)
   * @returns {Promise<Object>} Exported data
   */
  async exportInsights(params = {}) {
    return api.get('/insights/export', { params });
  }
}

// Export singleton instance
export default new InsightsService();


