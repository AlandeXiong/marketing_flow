import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';

const EmailTemplatePanel = () => {
  const [form] = Form.useForm();
  const handleSave = async () => {
    const values = await form.validateFields();
    // TODO: Replace with actual API call
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#8e24aa', marginBottom: 24, borderBottom: '1px solid #e1bee7', paddingBottom: 8 }}>
        Email Template
      </div>
      <Form form={form} layout="vertical">
        <Form.Item label="Subject" name="subject" initialValue="Secure Your Family's Future with Our New Insurance Plans" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item label="Body" name="body" initialValue="Discover our latest life insurance products designed for your family's protection and financial growth. Contact us for a personalized plan!"> <Input.TextArea rows={3} /> </Form.Item>
        <Form.Item label="CTA" name="cta" initialValue="Learn More"> <Input /> </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 12 }} onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>Save</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmailTemplatePanel; 