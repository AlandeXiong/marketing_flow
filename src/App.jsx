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
import { Modal, Select, Button } from 'antd';
import 'antd/dist/reset.css';
import ChatWidget from './components/ChatWidget';

const nodeTypes = {
  activityDetail: ActivityDetailNode,
  segment: SegmentNode,
  strategy: StrategyNode,
  emailTemplate: EmailTemplateNode,
};

const nodeTypeOptions = [
  { value: 'activityDetail', label: 'Campaign' },
  { value: 'segment', label: 'Segment' },
  { value: 'strategy', label: 'Strategy' },
  { value: 'emailTemplate', label: 'Email' },
];

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

function Panel({ nodeType, node, onClose, onSave }) {
  let Content = null;
  if (nodeType === 'activityDetail') Content = (props) => <ActivityDetailPanel {...props} node={node} onSave={onSave} />;
  if (nodeType === 'segment') Content = (props) => <SegmentPanel {...props} node={node} onSave={onSave} />;
  if (nodeType === 'strategy') Content = (props) => <StrategyPanel {...props} node={node} onSave={onSave} />;
  if (nodeType === 'emailTemplate') Content = (props) => <EmailTemplatePanel {...props} node={node} onSave={onSave} />;
  return (
    <div style={{ width: 480, height: '100%', background: '#fff', boxShadow: '-2px 0 8px #eee', padding: 24, position: 'fixed', right: 0, top: 0, zIndex: 10 }}>
      <button style={{ float: 'right', marginBottom: 16 }} onClick={onClose}>Close</button>
      {Content && <Content />}
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newNodeType, setNewNodeType] = useState();

  const onNodeClick = useCallback((event, node) => {
    setSelected(node.type);
    setSelectedNode(node);
  }, []);

  const handleClosePanel = () => setSelected(null);

  const handlePanelSave = (values) => {
    if (!selectedNode) return;
    setNodes((nds) => nds.map(n => n.id === selectedNode.id ? { ...n, label: values.name } : n));
    setSelected(null);
    setSelectedNode(null);
  };

  // 添加节点逻辑
  const handleAddNode = () => {
    setAddModalOpen(true);
    setNewNodeType(undefined);
  };
  // 自动布局函数
  const layoutAndSetNodes = (newNodes, newEdges) => {
    // This function is no longer needed as dagre is removed.
    // The nodes will be positioned manually or by user interaction.
    setNodes(newNodes);
  };
  const handleAddNodeOk = () => {
    if (!newNodeType) return;
    const newId = (nodes.length + 1).toString();
    const newNode = {
      id: newId,
      type: newNodeType,
      position: { x: 0, y: 0 },
      data: {},
      label: nodeTypeOptions.find(opt => opt.value === newNodeType)?.label || '',
    };
    let newNodes = [...nodes, newNode];
    let newEdges = edges;
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      newEdges = [...edges, { id: `e${lastNode.id}-${newId}`, source: lastNode.id, target: newId, animated: true, style: { strokeWidth: 3 } }];
    }
    layoutAndSetNodes(newNodes, newEdges);
    setEdges(newEdges);
    setAddModalOpen(false);
  };

  // 拖拽后自动布局
  const onNodesChangeWithLayout = (changes) => {
    onNodesChange(changes);
    layoutAndSetNodes(nodes, edges);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: '#f7f9fb' }}>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 1400, margin: '0 auto', height: '90vh', width: '100%', background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 0 0' }}>
          <h2 style={{ textAlign: 'center', margin: 0 }}>Insurance Campaign Flow</h2>
          <Button type="primary" onClick={handleAddNode}>Add Node</Button>
        </div>
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
        <Modal
          title="Add Node"
          open={addModalOpen}
          onOk={handleAddNodeOk}
          onCancel={() => setAddModalOpen(false)}
          okButtonProps={{ disabled: !newNodeType }}
        >
          <div style={{ margin: '24px 0' }}>
            <Select
              style={{ width: '100%' }}
              placeholder="Select node type"
              options={nodeTypeOptions}
              value={newNodeType}
              onChange={setNewNodeType}
            />
          </div>
        </Modal>
      </div>
      {selected && <Panel nodeType={selected} node={selectedNode} onClose={handleClosePanel} onSave={handlePanelSave} />}
      <ChatWidget />
    </div>
  );
}

export default App;
