import { NODE_TYPE_CONFIG, CONNECTION_SYMBOLS } from '../types/nodeTypes';

// Connection logic and positioning utilities
export class ConnectionManager {
  constructor() {
    this.connectionRules = {
      // Define which node types can connect to which
      allowedConnections: {
        start: ['activityDetail'],
        activityDetail: ['segment', 'condition'],
        segment: ['strategy', 'condition'],
        strategy: ['emailTemplate', 'condition'],
        condition: ['emailTemplate', 'strategy'],
        emailTemplate: [] // End node
      }
    };
  }

  // Check if two nodes can be connected
  canConnect(sourceType, targetType) {
    const allowedTargets = this.connectionRules.allowedConnections[sourceType] || [];
    return allowedTargets.includes(targetType);
  }

  // Get valid target types for a source node
  getValidTargets(sourceType) {
    return this.connectionRules.allowedConnections[sourceType] || [];
  }

  // Calculate position for new node
  calculateNodePosition(parentNode, nodes, nodeType) {
    const config = NODE_TYPE_CONFIG[nodeType];
    const baseOffset = config.shape === 'circle' ? 100 : 84; // Different offset for circular nodes
    
    let x = parentNode ? parentNode.position.x + baseOffset : 0;
    let y = parentNode ? parentNode.position.y : 0;
    
    // Avoid overlap
    const nodeHeight = config.size.height + 10;
    while (nodes.some(n => Math.abs(n.position.x - x) < 10 && Math.abs(n.position.y - y) < nodeHeight)) {
      y += nodeHeight;
    }
    
    return { x, y };
  }

  // Generate edge ID
  generateEdgeId(sourceId, targetId) {
    return `e${sourceId}-${targetId}`;
  }

  // Create edge object
  createEdge(sourceId, targetId, sourceType = null, targetType = null) {
    const edge = {
      id: this.generateEdgeId(sourceId, targetId),
      source: sourceId,
      target: targetId,
      animated: true,
      style: { strokeWidth: 3 }
    };

    // Make condition connections consistent with other nodes
    if (sourceType === 'condition' || targetType === 'condition') {
      edge.style = {
        ...edge.style,
        stroke: '#666' // Use same gray color as other connections
      };
    }

    return edge;
  }
}

// Export singleton instance
export const connectionManager = new ConnectionManager(); 