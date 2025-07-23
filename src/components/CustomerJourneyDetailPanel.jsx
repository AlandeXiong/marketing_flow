import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import 'antd/dist/reset.css';

const ActivityDetailPanel = ({ node, onSave }) => {
  const [form] = Form.useForm();
  const handleSave = async () => {
    const values = await form.validateFields();
    if (onSave) onSave(values);
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#0078d4', marginBottom: 24, borderBottom: '1px solid #e0e6ed', paddingBottom: 8 }}>
        Campaign Details
      </div>
      <Form form={form} layout="vertical" initialValues={{
        name: node?.label || '',
        period: null,
        budget: '200000',
        desc: 'Multi-channel campaign to promote new life insurance products and increase customer acquisition.'
      }}>
        <Form.Item label="Campaign Name" name="name" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item label="Period" name="period" rules={[{ required: true }]}> <DatePicker style={{ width: '100%' }} /> </Form.Item>
        <Form.Item label="Budget" name="budget" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item label="Description" name="desc"> <Input.TextArea rows={3} /> </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 12 }} onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ActivityDetailPanel; 