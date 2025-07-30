import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const StrategyNode = (props) => (
  <div style={{ width: 70, height: 39, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#00897b' }} />
    <Handle type="target" position={Position.Left} style={{ background: '#00897b' }} />
    <Card variant="outlined" styles={{ body: { padding: 0, textAlign: 'center' } }} style={{ width: 70, height: 39, borderRadius: 6, boxShadow: '0 2px 8px #b2dfdb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #00897b', background: '#e0f2f1', position: 'relative', padding: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <img src="/policy.png" alt="campaign" style={{ width: 17, height: 17, display: 'block', marginTop: 2 }} />
          <Title level={5} style={{ color: '#00897b', fontWeight: 700, margin: 0, fontSize: 7, lineHeight: '1.2', marginBottom: 1 }}>Strategy</Title>
        </div>
        <button
          style={{ position: 'absolute', right: 3, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, fontSize: 10, borderRadius: '50%', border: 'none', background: '#00897b', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          title="Add Node"
          onClick={e => { e.stopPropagation(); props?.data?.onAddNode && props.data.onAddNode(); }}
        >
          +
        </button>
      </div>
    </Card>
  </div>
);

export default StrategyNode; 