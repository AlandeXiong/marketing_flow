import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card, Typography } from 'antd';
import { NODE_TYPE_CONFIG } from '../types/nodeTypes';
import { nodeStyleManager } from '../styles/nodeStyles';
import ConditionNode from '../components/ConditionNode';

const { Title } = Typography;

// Generic node component factory
export class NodeFactory {
  static createNodeComponent(nodeType) {
    return (props) => {
      const config = NODE_TYPE_CONFIG[nodeType];
      const containerStyle = nodeStyleManager.getNodeContainerStyle(nodeType);
      const cardStyle = nodeStyleManager.getCardStyle(nodeType);
      const iconStyle = nodeStyleManager.getIconStyle(nodeType);
      const textStyle = nodeStyleManager.getTextStyle(nodeType);
      const buttonStyle = nodeStyleManager.getButtonStyle(nodeType);
      const handleStyle = nodeStyleManager.getHandleStyle(nodeType);

      const renderIcon = () => {
        const isEmoji = typeof config.icon === 'string' && config.icon.length <= 2;
        if (isEmoji) {
          return <div style={iconStyle}>{config.icon}</div>;
        }
        return <img src={config.icon} alt={config.label} style={iconStyle} />;
      };

      const renderHandles = () => {
        const handles = [];
        if (config.hasSource) {
          handles.push(
            <Handle 
              key="source" 
              type="source" 
              position={Position.Right} 
              style={handleStyle} 
            />
          );
        }
        if (config.hasTarget) {
          handles.push(
            <Handle 
              key="target" 
              type="target" 
              position={Position.Left} 
              style={handleStyle} 
            />
          );
        }
        return handles;
      };

      if (config.shape === 'circle') {
        return (
          <div style={containerStyle}>
            {renderHandles()}
            <div style={cardStyle}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                {renderIcon()}
                <Title level={5} style={textStyle}>{config.label}</Title>
                <button
                  style={buttonStyle}
                  title="Add Node"
                  onClick={e => { e.stopPropagation(); props?.data?.onAddNode && props.data.onAddNode(); }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (config.shape === 'diamond') {
        return <ConditionNode {...props} />;
      }

      return (
        <div style={containerStyle}>
          {renderHandles()}
          <Card variant="outlined" styles={{ body: { padding: 0, textAlign: 'center' } }} style={cardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                {renderIcon()}
                <Title level={5} style={textStyle}>{config.label}</Title>
              </div>
              <button
                style={buttonStyle}
                title="Add Node"
                onClick={e => { e.stopPropagation(); props?.data?.onAddNode && props.data.onAddNode(); }}
              >
                +
              </button>
            </div>
          </Card>
        </div>
      );
    };
  }

  // Create all node components
  static createAllNodeComponents() {
    const components = {};
    Object.keys(NODE_TYPE_CONFIG).forEach(nodeType => {
      components[nodeType] = this.createNodeComponent(nodeType);
    });
    return components;
  }
} 