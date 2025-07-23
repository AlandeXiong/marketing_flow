import { Card, CardPreview } from '@fluentui/react-components';
import { Handle, Position } from 'reactflow';
import * as React from 'react';

const EmailTemplateNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#8e24aa' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#8e24aa' }} />
    <Card style={{ width: 120, height: 80, padding: 0, borderRadius: 8, boxShadow: '0 2px 8px #e1bee7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #8e24aa', background: '#f3e5f5' }}>
      <CardPreview style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: 'none', margin: '4px 0' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#ba68c8"/>
          <rect x="5" y="8" width="14" height="8" rx="2" fill="#6a1b9a"/>
          <path d="M5 8l7 6 7-6" stroke="#fff" strokeWidth="1.5"/>
        </svg>
      </CardPreview>
      <div style={{ textAlign: 'center', fontSize: 14, color: '#8e24aa', fontWeight: 700, marginBottom: 2, lineHeight: '1.2' }}>
        Email
      </div>
    </Card>
  </div>
);

export default EmailTemplateNode; 