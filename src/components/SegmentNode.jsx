import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const SegmentNode = (props) => (
  <div style={{ width: 100, height: 56, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#ff9800' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#ff9800' }} />
    <Card variant="outlined" styles={{ body: { padding: 0, textAlign: 'center' } }} style={{ width: 100, height: 56, borderRadius: 8, boxShadow: '0 2px 8px #ffe0b2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #ef6c00', background: '#fff8e1', position: 'relative', padding: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <img src="/crowd.png" alt="campaign" style={{ width: 24, height: 24, display: 'block', marginTop: 4 }} />
          <Title level={5} style={{ color: '#ef6c00', fontWeight: 700, margin: 0, fontSize: 10, lineHeight: '1.2', marginBottom: 2 }}>Segment</Title>
        </div>
        <button
          style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, fontSize: 14, borderRadius: '50%', border: 'none', background: '#ef6c00', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          title="Add Node"
          onClick={e => { e.stopPropagation(); props?.data?.onAddNode && props.data.onAddNode(); }}
        >
          +
        </button>
      </div>
    </Card>
  </div>
);

export default SegmentNode; 