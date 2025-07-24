import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const ActivityDetailNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#0078d4' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#0078d4' }} />
    <Card variant="outlined" styles={{ body: { padding: 0, textAlign: 'center' } }} style={{ width: 120, height: 80, borderRadius: 8, boxShadow: '0 2px 8px #b3c6e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #1976d2', background: '#f3f9fd' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, margin: '4px auto' }}>
        <img src="/campaign.png" alt="campaign" style={{ width: 32, height: 32, display: 'block' }} />
      </div>
      <Title level={5} style={{ color: '#1565c0', fontWeight: 700, margin: 0, fontSize: 14, lineHeight: '1.2' }}>Campaign</Title>
    </Card>
  </div>
);

export default ActivityDetailNode; 