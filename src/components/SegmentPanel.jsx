import React, { useState } from 'react';
import { Input, Button } from '@fluentui/react-components';

const SegmentPanel = () => {
  const [age, setAge] = useState('30-55 years');
  const [location, setLocation] = useState('Nationwide');
  const [occupation, setOccupation] = useState('Professionals, Business Owners');
  const [needs, setNeeds] = useState('Family protection, wealth management');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#ef6c00', marginBottom: 24, borderBottom: '1px solid #ffe0b2', paddingBottom: 8 }}>
        Target Segment
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Age Group</label>
        <Input value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Location</label>
        <Input value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Occupation</label>
        <Input value={occupation} onChange={e => setOccupation(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Needs</label>
        <Input value={needs} onChange={e => setNeeds(e.target.value)} style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }} />
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
            background: '#ef6c00',
            color: '#fff',
            minWidth: 90,
            fontWeight: 600,
            border: '1px solid #ef6c00',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#b75b00')}
          onMouseOut={e => (e.currentTarget.style.background = '#ef6c00')}
          onClick={handleSave}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SegmentPanel; 