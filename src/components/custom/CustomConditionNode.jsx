import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Card, Typography, Badge, Tooltip } from 'antd';
import { NODE_TYPE_CONFIG } from '../../types/nodeTypes';
import { nodeStyleManager } from '../../styles/nodeStyles';
import { CUSTOM_HOOKS } from '../../config/customComponents';

const { Title, Text } = Typography;

const CustomConditionNode = (props) => {
  const [customData, setCustomData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const nodeType = 'condition';
  const config = NODE_TYPE_CONFIG[nodeType];
  const containerStyle = nodeStyleManager.getNodeContainerStyle(nodeType);
  const iconStyle = nodeStyleManager.getIconStyle(nodeType);
  const textStyle = nodeStyleManager.getTextStyle(nodeType);
  const buttonStyle = nodeStyleManager.getButtonStyle(nodeType);
  const handleStyle = nodeStyleManager.getHandleStyle(nodeType);

  // Custom hook for custom data
  const { customRender, customData: hookData, customEvents } = CUSTOM_HOOKS.useCustomNode(nodeType, props.data);

  // Custom API integration
  const { data: apiData, loading: apiLoading, error, refetch } = CUSTOM_HOOKS.useCustomAPI('condition-logic', {
    nodeId: props.id,
    nodeData: props.data
  });

  useEffect(() => {
    if (apiData) {
      setCustomData(apiData);
    }
  }, [apiData]);

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

  // Custom rendering logic
  const renderCustomContent = () => {
    if (customRender) {
      return customRender(props);
    }

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        height: '100%',
        padding: '8px 4px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          flex: 1,
          gap: '4px'
        }}>
          {renderIcon()}
          <Title level={5} style={textStyle}>{config.label}</Title>
          
          {/* Custom data display */}
          {customData && (
            <div style={{ marginTop: '4px' }}>
              <Badge 
                count={customData.pathCount || 0} 
                size="small" 
                style={{ backgroundColor: config.color }}
              />
              <Text style={{ fontSize: '8px', color: config.color, marginLeft: '4px' }}>
                {customData.status || 'Active'}
              </Text>
            </div>
          )}
          
          {/* Loading indicator */}
          {apiLoading && (
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: config.color,
              animation: 'pulse 1s infinite'
            }} />
          )}
        </div>
        
        <Tooltip title="Add custom node">
          <button
            style={buttonStyle}
            onClick={e => { 
              e.stopPropagation(); 
              props?.data?.onAddNode && props.data.onAddNode(); 
            }}
          >
            +
          </button>
        </Tooltip>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {renderHandles()}
      {renderCustomContent()}
    </div>
  );
};

export default CustomConditionNode; 