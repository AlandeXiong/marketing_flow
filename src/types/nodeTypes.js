// Node data types and their properties
export const NODE_TYPES = {
  START: 'start',
  CAMPAIGN: 'activityDetail',
  SEGMENT: 'segment',
  STRATEGY: 'strategy',
  EMAIL: 'emailTemplate',
  CONDITION: 'condition'
};

export const NODE_TYPE_CONFIG = {
  [NODE_TYPES.START]: {
    label: 'Start',
    color: '#4caf50',
    icon: '/start.png',
    hasTarget: false,
    hasSource: true,
    shape: 'circle',
    size: { width: 60, height: 60 }
  },
  [NODE_TYPES.CAMPAIGN]: {
    label: 'Campaign',
    color: '#1565c0',
    icon: '/campaign.png',
    hasTarget: true,
    hasSource: true,
    shape: 'rectangle',
    size: { width: 70, height: 39 }
  },
  [NODE_TYPES.SEGMENT]: {
    label: 'Segment',
    color: '#ef6c00',
    icon: '/crowd.png',
    hasTarget: true,
    hasSource: true,
    shape: 'rectangle',
    size: { width: 70, height: 39 }
  },
  [NODE_TYPES.STRATEGY]: {
    label: 'Strategy',
    color: '#00897b',
    icon: '/policy.png',
    hasTarget: true,
    hasSource: true,
    shape: 'rectangle',
    size: { width: 70, height: 39 }
  },
  [NODE_TYPES.EMAIL]: {
    label: 'Email',
    color: '#8e24aa',
    icon: '/channel.png',
    hasTarget: true,
    hasSource: true,
    shape: 'rectangle',
    size: { width: 70, height: 39 }
  },
  [NODE_TYPES.CONDITION]: {
    label: 'Condition',
    color: '#ff6b35',
    icon: '/condition.png',
    hasTarget: true,
    hasSource: true,
    shape: 'diamond',
    size: { width: 55, height: 55 }
  }
};

// Connection symbols configuration
export const CONNECTION_SYMBOLS = {
  [NODE_TYPES.CONDITION]: {
    icon: '/condition.png',
    size: { width: 16, height: 16 }
  }
};

export const NODE_TYPE_OPTIONS = Object.entries(NODE_TYPE_CONFIG)
  .filter(([value, config]) => value !== NODE_TYPES.START) // Exclude start node from add options
  .map(([value, config]) => ({
    value,
    label: config.label
  })); 