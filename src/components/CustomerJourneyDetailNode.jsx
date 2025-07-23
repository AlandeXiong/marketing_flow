import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, CardPreview } from '@fluentui/react-components';
import { Form, Input, DatePicker, Button } from 'antd';
import 'antd/dist/reset.css';

const ActivityDetailNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#0078d4' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#0078d4' }} />
    <Card style={{ width: 120, height: 80, padding: 0, borderRadius: 8, boxShadow: '0 2px 8px #b3c6e0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #1976d2', background: '#f3f9fd' }}>
      <CardPreview style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: 'none', margin: '4px 0' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#90caf9"/>
          <rect x="7" y="10.5" width="10" height="3" rx="1.5" fill="#1565c0"/>
          <rect x="11" y="6" width="2" height="12" rx="1" fill="#1565c0"/>
        </svg>
      </CardPreview>
      <div style={{ textAlign: 'center', fontSize: 14, color: '#1565c0', fontWeight: 700, marginBottom: 2, lineHeight: '1.2' }}>
        Campaign
      </div>
    </Card>
  </div>
);

export default ActivityDetailNode; 