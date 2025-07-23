import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input, Textarea, Button } from '@fluentui/react-components';

const ActivityDetailPanel = () => {
  const [name, setName] = useState('Summer Insurance Promotion');
  const [period, setPeriod] = useState(new Date());
  const [budget, setBudget] = useState('200000');
  const [desc, setDesc] = useState('Multi-channel campaign to promote new life insurance products and increase customer acquisition.');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await fetch('/api/campaign/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        period,
        budget,
        desc,
      }),
    });
    setLoading(false);
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#0078d4', marginBottom: 24, borderBottom: '1px solid #e0e6ed', paddingBottom: 8 }}>
        Campaign Details
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Campaign Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Period</label>
        <DatePicker selected={period} onChange={setPeriod} dateFormat="yyyy-MM-dd" className="react-datepicker__input" style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Budget</label>
        <Input value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Description</label>
        <Textarea value={desc} onChange={e => setDesc(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} rows={3} />
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
            background: '#0078d4',
            color: '#fff',
            minWidth: 90,
            fontWeight: 600,
            border: '1px solid #0078d4',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#005fa3')}
          onMouseOut={e => (e.currentTarget.style.background = '#0078d4')}
          onClick={handleSave}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ActivityDetailPanel; 