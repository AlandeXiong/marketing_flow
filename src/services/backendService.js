// Backend service for node data delivery and API interactions
export class BackendService {
  constructor() {
    this.baseUrl = 'ws://localhost:8080/chat';
    this.websocket = null;
    this.messageHandlers = new Map();
  }

  // Initialize WebSocket connection
  connect() {
    try {
      this.websocket = new WebSocket(this.baseUrl);
      
      this.websocket.onopen = () => {
        console.log('WebSocket connected');
      };
      
      this.websocket.onmessage = (event) => {
        this.handleMessage(event.data);
      };
      
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      this.websocket.onclose = () => {
        console.log('WebSocket disconnected');
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }

  // Send message to backend
  sendMessage(message) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  // Handle incoming messages
  handleMessage(data) {
    try {
      const message = JSON.parse(data);
      const handler = this.messageHandlers.get(message.type);
      if (handler) {
        handler(message);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }

  // Register message handlers
  registerHandler(messageType, handler) {
    this.messageHandlers.set(messageType, handler);
  }

  // Node-specific API methods
  async getCampaignData(campaignId) {
    this.sendMessage({
      type: 'campaign',
      id: campaignId
    });
  }

  async getSegmentData(segmentId) {
    this.sendMessage({
      type: 'segment',
      id: segmentId
    });
  }

  async getStrategyData(strategyId) {
    this.sendMessage({
      type: 'strategy',
      id: strategyId
    });
  }

  async getEmailTemplateData(templateId) {
    this.sendMessage({
      type: 'emailTemplate',
      id: templateId
    });
  }

  // Save node data
  async saveNodeData(nodeType, nodeId, data) {
    this.sendMessage({
      type: 'save',
      nodeType,
      nodeId,
      data
    });
  }

  // Get node suggestions
  async getNodeSuggestions(nodeType) {
    this.sendMessage({
      type: 'suggestions',
      nodeType
    });
  }

  // Validate node connections
  async validateConnection(sourceType, targetType) {
    this.sendMessage({
      type: 'validate',
      sourceType,
      targetType
    });
  }

  // Get flow analytics
  async getFlowAnalytics() {
    this.sendMessage({
      type: 'analytics'
    });
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }
}

// Export singleton instance
export const backendService = new BackendService(); 