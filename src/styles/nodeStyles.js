import { NODE_TYPE_CONFIG } from '../types/nodeTypes';

// Node styling and visual properties
export class NodeStyleManager {
  constructor() {
    this.baseStyles = {
      rectangle: {
        borderRadius: 6,
        boxShadow: '0 2px 8px',
        border: '2px solid',
        padding: 0
      },
      circle: {
        borderRadius: '50%',
        boxShadow: '0 4px 12px',
        border: '3px solid',
        padding: 0
      }
    };
  }

  // Get node container styles
  getNodeContainerStyle(nodeType) {
    const config = NODE_TYPE_CONFIG[nodeType];
    const baseStyle = this.baseStyles[config.shape];
    
    return {
      width: config.size.width,
      height: config.size.height,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...baseStyle,
      borderColor: config.color,
      boxShadow: `${baseStyle.boxShadow} ${this.getShadowColor(config.color)}`,
      background: config.shape === 'circle' 
        ? `linear-gradient(135deg, ${this.getLightColor(config.color)} 0%, ${this.getShadowColor(config.color)} 100%)`
        : this.getLightColor(config.color)
    };
  }

  // Get card styles for rectangle nodes
  getCardStyle(nodeType) {
    const config = NODE_TYPE_CONFIG[nodeType];
    const baseStyle = this.baseStyles[config.shape];
    
    return {
      width: config.size.width,
      height: config.size.height,
      ...baseStyle,
      borderColor: config.color,
      boxShadow: `${baseStyle.boxShadow} ${this.getShadowColor(config.color)}`,
      background: this.getLightColor(config.color),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: 0
    };
  }

  // Get icon styles
  getIconStyle(nodeType) {
    const config = NODE_TYPE_CONFIG[nodeType];
    const isEmoji = typeof config.icon === 'string' && config.icon.length <= 2;
    
    if (isEmoji) {
      return {
        fontSize: config.shape === 'circle' ? 24 : 17,
        color: config.color,
        marginBottom: config.shape === 'circle' ? 4 : 0,
        marginTop: config.shape === 'circle' ? 0 : 2
      };
    }
    
    return {
      width: config.shape === 'circle' ? 24 : 17,
      height: config.shape === 'circle' ? 24 : 17,
      display: 'block',
      marginTop: config.shape === 'circle' ? 0 : 2
    };
  }

  // Get text styles
  getTextStyle(nodeType) {
    const config = NODE_TYPE_CONFIG[nodeType];
    return {
      color: config.color,
      fontWeight: 700,
      margin: 0,
      fontSize: config.shape === 'circle' ? 8 : 7,
      lineHeight: '1.2',
      marginBottom: config.shape === 'circle' ? 0 : 1
    };
  }

  // Get button styles
  getButtonStyle(nodeType) {
    const config = NODE_TYPE_CONFIG[nodeType];
    const size = config.shape === 'circle' ? 16 : 14;
    const fontSize = config.shape === 'circle' ? 12 : 10;
    const right = config.shape === 'circle' ? 8 : 3;
    
    return {
      position: 'absolute',
      right,
      top: '50%',
      transform: 'translateY(-50%)',
      width: size,
      height: size,
      fontSize,
      borderRadius: '50%',
      border: 'none',
      background: config.color,
      color: '#fff',
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2
    };
  }

  // Get handle styles
  getHandleStyle(nodeType, position) {
    const config = NODE_TYPE_CONFIG[nodeType];
    return {
      background: config.color
    };
  }

  // Helper methods for color manipulation
  getLightColor(color) {
    const colorMap = {
      '#4caf50': '#e8f5e8',
      '#1565c0': '#f3f9fd',
      '#ef6c00': '#fff8e1',
      '#00897b': '#e0f2f1',
      '#8e24aa': '#f3e5f5'
    };
    return colorMap[color] || '#f5f5f5';
  }

  getShadowColor(color) {
    const colorMap = {
      '#4caf50': '#c8e6c9',
      '#1565c0': '#b3c6e0',
      '#ef6c00': '#ffe0b2',
      '#00897b': '#b2dfdb',
      '#8e24aa': '#e1bee7'
    };
    return colorMap[color] || '#e0e0e0';
  }
}

// Export singleton instance
export const nodeStyleManager = new NodeStyleManager(); 