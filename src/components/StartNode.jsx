import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const StartNode = (props) => (
  <div style={{ width: 80, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#4caf50' }} />
    <div style={{ 
      width: 80, 
      height: 80, 
      borderRadius: '50%', 
      boxShadow: '0 4px 12px #c8e6c9', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      border: '3px solid #4caf50', 
      background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)', 
      position: 'relative', 
      padding: 0 
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <div style={{ fontSize: 24, color: '#4caf50', marginBottom: 4 }}>⭕️</div>
        <Title level={5} style={{ color: '#4caf50', fontWeight: 700, margin: 0, fontSize: 8, lineHeight: '1.2' }}>Start</Title>
        <button
          style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, fontSize: 12, borderRadius: '50%', border: 'none', background: '#4caf50', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          title="Add Node"
          onClick={e => { e.stopPropagation(); props?.data?.onAddNode && props.data.onAddNode(); }}
        >
          +
        </button>
      </div>
    </div>
  </div>
);

export default StartNode; 