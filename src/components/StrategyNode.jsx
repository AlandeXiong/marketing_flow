import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const StrategyNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#00897b' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#00897b' }} />
    <Card variant="outlined" styles={{ body: { padding: 0, textAlign: 'center' } }} style={{ width: 120, height: 80, borderRadius: 8, boxShadow: '0 2px 8px #b2dfdb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #00897b', background: '#e0f2f1' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, margin: '4px auto' }}>
      <img src="/policy.png" alt="campaign" style={{ width: 32, height: 32, display: 'block' }} />
      </div>
      <Title level={5} style={{ color: '#00897b', fontWeight: 700, margin: 0, fontSize: 14, lineHeight: '1.2' }}>Strategy</Title>
    </Card>
  </div>
);

export default StrategyNode; 