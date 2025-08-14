import React from 'react';

const StatusIndicator = ({ status, text }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected': return '#52c41a';
      case 'disconnected': return '#ff4d4f';
      case 'error': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  return (
    <div style={{
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: getStatusColor(),
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      display: 'inline-block'
    }}>
      {text}
    </div>
  );
};

export default StatusIndicator;
