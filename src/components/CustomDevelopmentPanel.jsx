import React, { useState } from 'react';
import { Card, Typography, Select, Input, Button, Space, Divider, Switch, Tabs, Form, Upload, message } from 'antd';
import { PlusOutlined, CodeOutlined, ApiOutlined, SettingOutlined } from '@ant-design/icons';
import { CUSTOM_COMPONENTS_CONFIG, CUSTOM_UTILS } from '../config/customComponents';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const CustomDevelopmentPanel = () => {
  const [activeTheme, setActiveTheme] = useState('modern-theme');
  const [customComponents, setCustomComponents] = useState([]);
  const [apiEndpoints, setApiEndpoints] = useState([]);

  const handleThemeChange = (themeName) => {
    setActiveTheme(themeName);
    CUSTOM_UTILS.applyCustomTheme(themeName);
    message.success(`Theme changed to ${themeName}`);
  };

  const handleCustomComponentUpload = (file) => {
    // Handle custom component file upload
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const componentCode = e.target.result;
        // Here you would typically compile and register the component
        message.success('Custom component uploaded successfully');
      } catch (error) {
        message.error('Failed to upload custom component');
      }
    };
    reader.readAsText(file);
    return false; // Prevent default upload
  };

  const handleAPIEndpointAdd = (values) => {
    const newEndpoint = {
      name: values.name,
      endpoint: values.endpoint,
      method: values.method,
      description: values.description
    };
    setApiEndpoints([...apiEndpoints, newEndpoint]);
    CUSTOM_UTILS.registerCustomAPI(values.name, values.endpoint, newEndpoint);
    message.success('API endpoint added successfully');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={4}>
        <CodeOutlined /> Custom Development
      </Title>
      
      <Tabs defaultActiveKey="components">
        <TabPane tab="Custom Components" key="components">
          <Card title="Component Management" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Upload Custom Component</Text>
                <Upload
                  beforeUpload={handleCustomComponentUpload}
                  accept=".js,.jsx,.ts,.tsx"
                  showUploadList={false}
                >
                  <Button icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                    Upload Component File
                  </Button>
                </Upload>
              </div>
              
              <div>
                <Text strong>Available Custom Components</Text>
                <div style={{ marginTop: 8 }}>
                  {Object.entries(CUSTOM_COMPONENTS_CONFIG.customNodes).map(([key, config]) => (
                    <Card key={key} size="small" style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <Text strong>{config.component}</Text>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {config.description}
                          </div>
                        </div>
                        <Switch size="small" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="API Integration" key="api">
          <Card title="API Endpoints" style={{ marginBottom: 16 }}>
            <Form onFinish={handleAPIEndpointAdd} layout="vertical">
              <Form.Item name="name" label="Endpoint Name" rules={[{ required: true }]}>
                <Input placeholder="Enter endpoint name" />
              </Form.Item>
              
              <Form.Item name="endpoint" label="API Endpoint" rules={[{ required: true }]}>
                <Input placeholder="/api/custom/endpoint" />
              </Form.Item>
              
              <Form.Item name="method" label="HTTP Method" rules={[{ required: true }]}>
                <Select placeholder="Select method">
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
                </Select>
              </Form.Item>
              
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter endpoint description" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<ApiOutlined />}>
                  Add API Endpoint
                </Button>
              </Form.Item>
            </Form>
            
            <Divider />
            
            <div>
              <Text strong>Registered API Endpoints</Text>
              <div style={{ marginTop: 8 }}>
                {Object.entries(CUSTOM_COMPONENTS_CONFIG.customAPIs).map(([key, config]) => (
                  <Card key={key} size="small" style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Text strong>{key}</Text>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {config.method} {config.endpoint}
                        </div>
                        <div style={{ fontSize: '11px', color: '#999' }}>
                          {config.description}
                        </div>
                      </div>
                      <Switch size="small" defaultChecked />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="Styling" key="styling">
          <Card title="Theme Configuration" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Select Theme</Text>
                <Select
                  value={activeTheme}
                  onChange={handleThemeChange}
                  style={{ width: '100%', marginTop: 8 }}
                >
                  {Object.entries(CUSTOM_COMPONENTS_CONFIG.customStyles).map(([key, theme]) => (
                    <Option key={key} value={key}>
                      <div>
                        <div>{theme.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{theme.description}</div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
              
              <div>
                <Text strong>Custom CSS Variables</Text>
                <div style={{ marginTop: 8 }}>
                  {activeTheme && CUSTOM_COMPONENTS_CONFIG.customStyles[activeTheme] && (
                    <div style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
                      {Object.entries(CUSTOM_COMPONENTS_CONFIG.customStyles[activeTheme].variables).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '4px', fontSize: '12px' }}>
                          <Text code>{key}: {value}</Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Space>
          </Card>
        </TabPane>

        <TabPane tab="Settings" key="settings">
          <Card title="Development Settings" style={{ marginBottom: 16 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Enable Custom Development</Text>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Allow custom component development
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>API Integration</Text>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Enable custom API endpoints
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Hot Reload</Text>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Auto-reload custom components
                  </div>
                </div>
                <Switch />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Debug Mode</Text>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Enable detailed logging
                  </div>
                </div>
                <Switch />
              </div>
            </Space>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustomDevelopmentPanel; 