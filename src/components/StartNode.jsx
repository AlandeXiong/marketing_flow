import { Handle, Position } from 'reactflow';
import * as React from 'react';
import { Card, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Title } = Typography;

const StartNode = (props) => (
  <div style={{ width: 60, height:60, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Handle type="source" position={Position.Right} style={{ background: '#4caf50' }} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <img src="/start.png" alt="campaign" style={{ width: 17, height: 17, display: 'block', marginTop: 2 }} />
      
        <button
          style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, fontSize: 12, borderRadius: '50%', border: 'none', background: '#4caf50', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          title="Add Node"
          onClick={e => { e.stopPropagation(); props?.data?.onAddNode && props.data.onAddNode(); }}
        >
          +
        </button>
      </div>
    </div>
);

export default StartNode; 