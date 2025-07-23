import { Card, CardPreview } from '@fluentui/react-components';
import { Handle, Position } from 'reactflow';
import * as React from 'react';

const SegmentNode = () => (
  <div style={{ width: 120, height: 80, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#ff9800' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#ff9800' }} />
    <Card style={{ width: 120, height: 80, padding: 0, borderRadius: 8, boxShadow: '0 2px 8px #ffe0b2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #ef6c00', background: '#fff8e1' }}>
      <CardPreview style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: 'none', margin: '4px 0' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#ffb74d"/>
          <circle cx="8" cy="11" r="3" fill="#ef6c00"/>
          <circle cx="16" cy="11" r="3" fill="#ef6c00"/>
          <ellipse cx="12" cy="18" rx="6" ry="3" fill="#ef6c00"/>
        </svg>
      </CardPreview>
      <div style={{ textAlign: 'center', fontSize: 14, color: '#ef6c00', fontWeight: 700, marginBottom: 2, lineHeight: '1.2' }}>
        Segment
      </div>
    </Card>
  </div>
);

export default SegmentNode; 