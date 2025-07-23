import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';

const SegmentPanel = () => {
  const [form] = Form.useForm();
  const handleSave = async () => {
    const values = await form.validateFields();
    // TODO: Replace with actual API call
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#ef6c00', marginBottom: 24, borderBottom: '1px solid #ffe0b2', paddingBottom: 8 }}>
        Target Segment
      </div>
      <Form form={form} layout="vertical">
        <Form.Item label="Age Group" name="age" initialValue="30-55 years" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item label="Location" name="location" initialValue="Nationwide" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item label="Occupation" name="occupation" initialValue="Professionals, Business Owners"> <Input /> </Form.Item>
        <Form.Item label="Needs" name="needs" initialValue="Family protection, wealth management"> <Input /> </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 12 }} onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SegmentPanel; 