import React, { useState } from 'react';
import { Button } from '@fluentui/react-components';
import { Slider, Select } from 'antd';
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
  const [channels, setChannels] = useState(['email', 'sms']);
  const [frequency, setFrequency] = useState(1);
  const [budget, setBudget] = useState(50);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div style={{ background: '#f4f6fa', borderRadius: 12, boxShadow: '0 2px 16px #e0e6ed', padding: 32, minWidth: 340, maxWidth: 600 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#00897b', marginBottom: 24, borderBottom: '1px solid #b2dfdb', paddingBottom: 8 }}>
        Delivery Strategy
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Channels</label>
        <Select
          mode="multiple"
          allowClear
          value={channels}
          onChange={setChannels}
          options={channelsOptions}
          style={{ width: '100%', borderRadius: 6, borderColor: '#b6d4fa', background: '#fff' }}
          placeholder="Select channels"
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Frequency (per week)</label>
        <Slider
          marks={frequencyMarks}
          step={null}
          included={false}
          min={1}
          max={7}
          value={frequency}
          onChange={setFrequency}
          style={{ width: '100%', margin: '0 8px' }}
        />
      </div>
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 6 }}>Budget Allocation (% to Email)</label>
        <Slider
          marks={budgetMarks}
          step={null}
          included={false}
          min={0}
          max={100}
          value={budget}
          onChange={setBudget}
          style={{ width: '100%', margin: '0 8px' }}
        />
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
            background: '#00897b',
            color: '#fff',
            minWidth: 90,
            fontWeight: 600,
            border: '1px solid #00897b',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#005f56')}
          onMouseOut={e => (e.currentTarget.style.background = '#00897b')}
          onClick={handleSave}
          loading={loading}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default StrategyPanel; 