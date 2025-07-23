import React from 'react';
import { Form, Select, Slider, Button } from 'antd';
import 'antd/dist/reset.css';

const channelsOptions = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: "What's App" },
  { value: 'social', label: 'Social Media' },
  { value: 'call', label: 'Call Center' },
];

const frequencyMarks = {
  1: '1x',
  2: '2x',
  3: '3x',
  4: '4x',
  5: '5x',
  6: '6x',
  7: '7x',
};

const budgetMarks = {
  0: '0%',
  20: '20%',
  40: '40%',
  60: '60%',
  80: '80%',
  100: '100%',
};

const StrategyPanel = () => {
  const [form] = Form.useForm();
  const handleSave = async () => {
    const values = await form.validateFields();
    // TODO: Replace with actual API call
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#00897b', marginBottom: 24, borderBottom: '1px solid #b2dfdb', paddingBottom: 8 }}>
        Delivery Strategy
      </div>
      <Form form={form} layout="vertical">
        <Form.Item label="Channels" name="channels" initialValue={['email', 'sms']} rules={[{ required: true }]}> <Select mode="multiple" allowClear options={channelsOptions} placeholder="Select channels" /> </Form.Item>
        <Form.Item label="Frequency (per week)" name="frequency" initialValue={1} rules={[{ required: true }]}> <Slider marks={frequencyMarks} step={null} included={false} min={1} max={7} style={{ width: '100%', margin: '0 8px' }} /> </Form.Item>
        <Form.Item label="Budget Allocation (% to Email)" name="budget" initialValue={50} rules={[{ required: true }]}> <Slider marks={budgetMarks} step={null} included={false} min={0} max={100} style={{ width: '100%', margin: '0 8px' }} /> </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 12 }} onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StrategyPanel; 