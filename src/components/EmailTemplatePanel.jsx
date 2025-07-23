import React, { useState } from 'react';
import { Input, Textarea, Button } from '@fluentui/react-components';

const EmailTemplatePanel = () => {
  const [subject, setSubject] = useState("Secure Your Family's Future with Our New Insurance Plans");
  const [body, setBody] = useState("Discover our latest life insurance products designed for your family's protection and financial growth. Contact us for a personalized plan!");
  const [cta, setCta] = useState('Learn More');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#8e24aa', marginBottom: 24, borderBottom: '1px solid #e1bee7', paddingBottom: 8 }}>
        Email Template
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Subject</label>
        <Input value={subject} onChange={e => setSubject(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Body</label>
        <Textarea value={body} onChange={e => setBody(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} rows={3} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>CTA</label>
        <Input value={cta} onChange={e => setCta(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button
          style={{
            background: '#e0e6ed',
            color: '#333',
            border: '1px solid #b0b8c1',
            minWidth: 90,
            fontWeight: 600,
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#cfd8dc')}
          onMouseOut={e => (e.currentTarget.style.background = '#e0e6ed')}
        >
          Cancel
        </Button>
        <Button
          appearance="primary"
          style={{
            background: '#8e24aa',
            color: '#fff',
            minWidth: 90,
            fontWeight: 600,
            border: '1px solid #8e24aa',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#5e1674')}
          onMouseOut={e => (e.currentTarget.style.background = '#8e24aa')}
          onClick={handleSave}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplatePanel; 