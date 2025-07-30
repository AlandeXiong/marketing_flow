// Custom component configuration for extensible node development
export const CUSTOM_COMPONENTS_CONFIG = {
  // Custom node components that can replace default nodes
  customNodes: {
    // Example: Custom campaign node
    'custom-campaign': {
      component: 'CustomCampaignNode',
      description: 'Custom campaign node with advanced features',
      category: 'campaign',
      defaultNodeType: 'activityDetail'
    },
    // Example: Custom condition node
    'custom-condition': {
      component: 'CustomConditionNode', 
      description: 'Custom condition node with advanced logic',
      category: 'condition',
      defaultNodeType: 'condition'
    }
  },

  // Custom panel components for configuration
  customPanels: {
    'custom-campaign-panel': {
      component: 'CustomCampaignPanel',
      description: 'Advanced campaign configuration panel',
      category: 'campaign'
    },
    'custom-condition-panel': {
      component: 'CustomConditionPanel',
      description: 'Advanced condition configuration panel', 
      category: 'condition'
    }
  },

  // Custom API endpoints for data integration
  customAPIs: {
    'campaign-data': {
      endpoint: '/api/custom/campaign',
      method: 'GET',
      description: 'Custom campaign data endpoint',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    'condition-logic': {
      endpoint: '/api/custom/condition',
      method: 'POST',
      description: 'Custom condition logic endpoint',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    'segment-data': {
      endpoint: '/api/custom/segment',
      method: 'GET',
      description: 'Custom segment data endpoint',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },

  // Custom styling configurations
  customStyles: {
    'modern-theme': {
      name: 'Modern Theme',
      description: 'Modern flat design theme',
      variables: {
        '--primary-color': '#1890ff',
        '--secondary-color': '#52c41a',
        '--border-radius': '8px',
        '--shadow': '0 2px 8px rgba(0,0,0,0.1)'
      }
    },
    'dark-theme': {
      name: 'Dark Theme',
      description: 'Dark mode theme',
      variables: {
        '--primary-color': '#177ddc',
        '--secondary-color': '#49aa19',
        '--background-color': '#141414',
        '--text-color': '#ffffff'
      }
    }
  }
};

// Custom development hooks
export const CUSTOM_HOOKS = {
  // Hook for custom node rendering
  useCustomNode: (nodeType, nodeData) => {
    // Custom logic for node rendering
    return {
      customRender: null,
      customData: nodeData,
      customEvents: {}
    };
  },

  // Hook for custom API calls
  useCustomAPI: (endpoint, options = {}) => {
    // Custom API integration logic
    return {
      data: null,
      loading: false,
      error: null,
      refetch: () => {}
    };
  },

  // Hook for custom styling
  useCustomStyle: (themeName) => {
    // Custom styling logic
    return {
      theme: CUSTOM_COMPONENTS_CONFIG.customStyles[themeName] || {},
      applyTheme: () => {}
    };
  }
};

// Custom development utilities
export const CUSTOM_UTILS = {
  // Register custom component
  registerCustomComponent: (name, component, config) => {
    CUSTOM_COMPONENTS_CONFIG.customNodes[name] = {
      component,
      ...config
    };
  },

  // Register custom API
  registerCustomAPI: (name, endpoint, config) => {
    CUSTOM_COMPONENTS_CONFIG.customAPIs[name] = {
      endpoint,
      ...config
    };
  },

  // Apply custom theme
  applyCustomTheme: (themeName) => {
    const theme = CUSTOM_COMPONENTS_CONFIG.customStyles[themeName];
    if (theme) {
      Object.entries(theme.variables).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }
}; 