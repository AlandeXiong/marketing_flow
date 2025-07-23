import { Card, CardPreview } from '@fluentui/react-components';
import { Handle, Position } from 'reactflow';
import * as React from 'react';

const StrategyNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#00897b' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#00897b' }} />
    <Card style={{ width: 120, height: 80, padding: 0, borderRadius: 8, boxShadow: '0 2px 8px #b2dfdb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #00897b', background: '#e0f2f1' }}>
      <CardPreview style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: 'none', margin: '4px 0' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#81c784"/>
          <rect x="9" y="7" width="6" height="10" rx="1.5" fill="#388e3c"/>
          <rect x="11" y="5" width="2" height="3" rx="1" fill="#388e3c"/>
        </svg>
      </CardPreview>
      <div style={{ textAlign: 'center', fontSize: 14, color: '#00897b', fontWeight: 700, marginBottom: 2, lineHeight: '1.2' }}>
        Strategy
      </div>
    </Card>
  </div>
);

export default StrategyNode; 