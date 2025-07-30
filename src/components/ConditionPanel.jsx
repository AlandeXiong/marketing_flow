import React, { useState } from 'react';
import { Card, Typography, Select, Input, Button, Space, Divider, Tag } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const ConditionPanel = ({ node, onSave }) => {
  const [conditionName, setConditionName] = useState(node?.data?.name || 'Condition');
  const [conditionType, setConditionType] = useState(node?.data?.conditionType || 'user_segment');
  const [flowPaths, setFlowPaths] = useState(node?.data?.flowPaths || [
    { id: 1, name: 'Yes', condition: 'true', targetType: 'strategy' },
    { id: 2, name: 'No', condition: 'false', targetType: 'emailTemplate' }
  ]);

  const conditionTypes = [
    { value: 'user_segment', label: 'User Segment', description: 'Based on user characteristics' },
    { value: 'behavior', label: 'User Behavior', description: 'Based on user actions' },
    { value: 'time', label: 'Time-based', description: 'Based on time conditions' },
    { value: 'custom', label: 'Custom Logic', description: 'Custom business rules' }
  ];

  const targetNodeTypes = [
    { value: 'segment', label: 'Segment' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'emailTemplate', label: 'Email Template' },
    { value: 'condition', label: 'Another Condition' }
  ];

  const addFlowPath = () => {
    const newId = Math.max(...flowPaths.map(p => p.id), 0) + 1;
    setFlowPaths([...flowPaths, {
      id: newId,
      name: `Path ${newId}`,
      condition: '',
      targetType: 'strategy'
    }]);
  };

  const removeFlowPath = (id) => {
    setFlowPaths(flowPaths.filter(p => p.id !== id));
  };

  const updateFlowPath = (id, field, value) => {
    setFlowPaths(flowPaths.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSave = () => {
    const data = {
      name: conditionName,
      conditionType,
      flowPaths,
      description: `${conditionType} condition with ${flowPaths.length} paths`
    };
    onSave(data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={4}>Condition Configuration</Title>
      
      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>Condition Name</Text>
            <Input
              value={conditionName}
              onChange={(e) => setConditionName(e.target.value)}
              placeholder="Enter condition name"
              style={{ marginTop: 8 }}
            />
          </div>
          
          <div>
            <Text strong>Condition Type</Text>
            <Select
              value={conditionType}
              onChange={setConditionType}
              style={{ width: '100%', marginTop: 8 }}
            >
              {conditionTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  <div>
                    <div>{type.label}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{type.description}</div>
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </Space>
      </Card>

      <Card title="Flow Paths" extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={addFlowPath} size="small">
          Add Path
        </Button>
      }>
        <Space direction="vertical" style={{ width: '100%' }}>
          {flowPaths.map((path, index) => (
            <Card key={path.id} size="small" style={{ border: '1px solid #d9d9d9' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>Path {index + 1}</Text>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeFlowPath(path.id)}
                    danger
                    size="small"
                  />
                </div>
                
                <div>
                  <Text>Path Name</Text>
                  <Input
                    value={path.name}
                    onChange={(e) => updateFlowPath(path.id, 'name', e.target.value)}
                    placeholder="Enter path name"
                    style={{ marginTop: 4 }}
                  />
                </div>
                
                <div>
                  <Text>Condition</Text>
                  <Input
                    value={path.condition}
                    onChange={(e) => updateFlowPath(path.id, 'condition', e.target.value)}
                    placeholder="Enter condition logic"
                    style={{ marginTop: 4 }}
                  />
                </div>
                
                <div>
                  <Text>Target Node Type</Text>
                  <Select
                    value={path.targetType}
                    onChange={(value) => updateFlowPath(path.id, 'targetType', value)}
                    style={{ width: '100%', marginTop: 4 }}
                  >
                    {targetNodeTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Space>
            </Card>
          ))}
        </Space>
      </Card>

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => onSave(null)}>Cancel</Button>
        <Button type="primary" onClick={handleSave}>
          Save Configuration
        </Button>
      </div>

      <Divider />

      <Card title="Preview" size="small">
        <div>
          <Text strong>Condition:</Text> {conditionName}
        </div>
        <div style={{ marginTop: 8 }}>
          <Text strong>Type:</Text> {conditionTypes.find(t => t.value === conditionType)?.label}
        </div>
        <div style={{ marginTop: 8 }}>
          <Text strong>Paths:</Text>
          <div style={{ marginTop: 4 }}>
            {flowPaths.map((path, index) => (
              <Tag key={path.id} color="blue" style={{ marginBottom: 4 }}>
                {path.name} → {targetNodeTypes.find(t => t.value === path.targetType)?.label}
              </Tag>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConditionPanel; 