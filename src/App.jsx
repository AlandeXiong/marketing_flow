import React, { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ActivityDetailNode from './components/CustomerJourneyDetailNode';
import SegmentNode from './components/SegmentNode';
import StrategyNode from './components/StrategyNode';
import EmailTemplateNode from './components/EmailTemplateNode';
import ActivityDetailPanel from './components/CustomerJourneyDetailPanel';
import SegmentPanel from './components/SegmentPanel';
import StrategyPanel from './components/StrategyPanel';
import EmailTemplatePanel from './components/EmailTemplatePanel';
import 'react-datepicker/dist/react-datepicker.css';
import 'antd/dist/reset.css'; // Ant Design v5 推荐

const nodeTypes = {
  activityDetail: ActivityDetailNode,
  segment: SegmentNode,
  strategy: StrategyNode,
  emailTemplate: EmailTemplateNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'activityDetail',
    position: { x: 0, y: 200 },
    data: {},
    label: 'Insurance Campaign Details',
  },
  {
    id: '2',
    type: 'segment',
    position: { x: 180, y: 200 },
    data: {},
    label: 'Target Segment',
  },
  {
    id: '3',
    type: 'strategy',
    position: { x: 360, y: 200 },
    data: {},
    label: 'Delivery Strategy',
  },
  {
    id: '4',
    type: 'emailTemplate',
    position: { x: 540, y: 200 },
    data: {},
    label: 'Email Template',
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 3 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeWidth: 3 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { strokeWidth: 3 } },
];

function Panel({ nodeType, onClose }) {
  let Content = null;
  if (nodeType === 'activityDetail') Content = ActivityDetailPanel;
  if (nodeType === 'segment') Content = SegmentPanel;
  if (nodeType === 'strategy') Content = StrategyPanel;
  if (nodeType === 'emailTemplate') Content = EmailTemplatePanel;
  return (
    <div style={{ width: 480, height: '100%', background: '#fff', boxShadow: '-2px 0 8px #eee', padding: 24, position: 'fixed', right: 0, top: 0, zIndex: 10 }}>
      <button style={{ float: 'right', marginBottom: 16 }} onClick={onClose}>Close</button>
      {Content && <Content />}
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event, node) => {
    setSelected(node.type);
  }, []);

  const handleClosePanel = () => setSelected(null);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: '#f7f9fb' }}>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 1600, margin: '0 auto', height: '90vh', width: '100%', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', margin: 20 }}>Insurance Campaign Flow</h2>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          onNodeClick={onNodeClick}
          nodesDraggable={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      {selected && <Panel nodeType={selected} onClose={handleClosePanel} />}
    </div>
  );
}

export default App;
