import React from 'react';

// 兼容的Alert组件，保持原有风格
export const CompatibleAlert = ({ message, type, showIcon, size, style }) => {
  const getTypeColor = () => {
    switch (type) {
      case 'success': return '#52c41a';
      case 'error': return '#ff4d4f';
      case 'warning': return '#faad14';
      case 'info': return '#1890ff';
      default: return '#d9d9d9';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return '•';
    }
  };

  return (
    <div style={{
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: getTypeColor(),
      color: 'white',
      fontSize: size === 'small' ? '10px' : '12px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      ...style
    }}>
      {showIcon && <span>{getTypeIcon()}</span>}
      {message}
    </div>
  );
};

// 兼容的Space组件，保持原有风格
export const CompatibleSpace = ({ children, direction = 'horizontal', size = 'small', style, ...props }) => {
  const isVertical = direction === 'vertical';
  const gap = size === 'small' ? '8px' : size === 'middle' ? '16px' : '24px';
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: isVertical ? 'column' : 'row',
      gap,
      alignItems: isVertical ? 'stretch' : 'center',
      ...style,
      ...props
    }}>
      {children}
    </div>
  );
};

// 兼容的Tag组件，保持原有风格
export const CompatibleTag = ({ children, color, style, ...props }) => {
  const getColor = () => {
    if (color) return color;
    return '#d9d9d9'; // default color
  };

  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      fontSize: '12px',
      lineHeight: '20px',
      borderRadius: '4px',
      backgroundColor: getColor(),
      color: '#fff',
      border: '1px solid transparent',
      ...style
    }} {...props}>
      {children}
    </span>
  );
};
