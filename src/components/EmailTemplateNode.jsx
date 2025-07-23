import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const EmailTemplateNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#8e24aa' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#8e24aa' }} />
    <Card variant="outlined" styles={{ body: { padding: 0, textAlign: 'center' } }} style={{ width: 120, height: 80, borderRadius: 8, boxShadow: '0 2px 8px #e1bee7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #8e24aa', background: '#f3e5f5' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, margin: '4px auto' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#ba68c8"/>
          <rect x="5" y="8" width="14" height="8" rx="2" fill="#6a1b9a"/>
          <path d="M5 8l7 6 7-6" stroke="#fff" strokeWidth="1.5"/>
        </svg>
      </div>
      <Title level={5} style={{ color: '#8e24aa', fontWeight: 700, margin: 0, fontSize: 14, lineHeight: '1.2' }}>Email</Title>
    </Card>
  </div>
);

export default EmailTemplateNode; 