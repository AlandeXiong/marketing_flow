import { useState, useEffect } from 'react';

// Custom API service for backend integration
export class CustomAPIService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
    this.endpoints = {
      condition: '/api/custom/condition',
      campaign: '/api/custom/campaign',
      segment: '/api/custom/segment',
      strategy: '/api/custom/strategy',
      email: '/api/custom/email'
    };
  }

  // Generic API call method
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Condition-specific API calls
  async getConditionData(nodeId, nodeData) {
    return this.makeRequest(this.endpoints.condition, {
      method: 'POST',
      body: JSON.stringify({
        nodeId,
        nodeData,
        action: 'get'
      })
    });
  }

  async saveConditionData(nodeId, conditionData) {
    return this.makeRequest(this.endpoints.condition, {
      method: 'POST',
      body: JSON.stringify({
        nodeId,
        conditionData,
        action: 'save'
      })
    });
  }

  async executeConditionLogic(nodeId, inputData) {
    return this.makeRequest(this.endpoints.condition, {
      method: 'POST',
      body: JSON.stringify({
        nodeId,
        inputData,
        action: 'execute'
      })
    });
  }

  // Campaign-specific API calls
  async getCampaignData(nodeId) {
    return this.makeRequest(this.endpoints.campaign, {
      method: 'GET',
      headers: {
        'Node-ID': nodeId
      }
    });
  }

  async updateCampaignData(nodeId, campaignData) {
    return this.makeRequest(this.endpoints.campaign, {
      method: 'PUT',
      body: JSON.stringify({
        nodeId,
        campaignData
      })
    });
  }

  // Segment-specific API calls
  async getSegmentData(nodeId) {
    return this.makeRequest(this.endpoints.segment, {
      method: 'GET',
      headers: {
        'Node-ID': nodeId
      }
    });
  }

  async createSegment(nodeId, segmentData) {
    return this.makeRequest(this.endpoints.segment, {
      method: 'POST',
      body: JSON.stringify({
        nodeId,
        segmentData
      })
    });
  }

  // Strategy-specific API calls
  async getStrategyData(nodeId) {
    return this.makeRequest(this.endpoints.strategy, {
      method: 'GET',
      headers: {
        'Node-ID': nodeId
      }
    });
  }

  async updateStrategy(nodeId, strategyData) {
    return this.makeRequest(this.endpoints.strategy, {
      method: 'PUT',
      body: JSON.stringify({
        nodeId,
        strategyData
      })
    });
  }

  // Email-specific API calls
  async getEmailTemplateData(nodeId) {
    return this.makeRequest(this.endpoints.email, {
      method: 'GET',
      headers: {
        'Node-ID': nodeId
      }
    });
  }

  async saveEmailTemplate(nodeId, templateData) {
    return this.makeRequest(this.endpoints.email, {
      method: 'POST',
      body: JSON.stringify({
        nodeId,
        templateData
      })
    });
  }

  // Custom hook for React components
  useCustomAPI(endpoint, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let result;
        switch (endpoint) {
          case 'condition-logic':
            result = await this.getConditionData(options.nodeId, options.nodeData);
            break;
          case 'campaign-data':
            result = await this.getCampaignData(options.nodeId);
            break;
          case 'segment-data':
            result = await this.getSegmentData(options.nodeId);
            break;
          case 'strategy-data':
            result = await this.getStrategyData(options.nodeId);
            break;
          case 'email-data':
            result = await this.getEmailTemplateData(options.nodeId);
            break;
          default:
            throw new Error(`Unknown endpoint: ${endpoint}`);
        }
        
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const refetch = () => {
      fetchData();
    };

    // Auto-fetch on mount if options are provided
    useEffect(() => {
      if (options.nodeId) {
        fetchData();
      }
    }, [options.nodeId]);

    return {
      data,
      loading,
      error,
      refetch
    };
  }
}

// Export singleton instance
export const customAPIService = new CustomAPIService(); 