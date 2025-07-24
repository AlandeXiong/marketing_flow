import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Input, Button, List, Card } from 'antd';

const MCP_WS_URL = 'ws://localhost:8080/chat';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    if (open && !ws.current) {
      ws.current = new window.WebSocket(MCP_WS_URL);
      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages((msgs) => [...msgs, { role: 'server', content: data }]);
        } catch {
          setMessages((msgs) => [...msgs, { role: 'server', content: event.data }]);
        }
      };
      ws.current.onclose = () => { ws.current = null; };
    }
    return () => {
      if (ws.current) { ws.current.close(); ws.current = null; }
    };
  }, [open]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    if (ws.current && ws.current.readyState === 1) {
      ws.current.send(input);
    }
    setInput('');
  };

  const renderMsg = (msg, idx) => {
    if (msg.role === 'user') {
      return <div key={idx} style={{ textAlign: 'right', margin: '8px 0' }}><Card size="small" style={{ display: 'inline-block', background: '#e6f7ff' }}>{msg.content}</Card></div>;
    }
    // 结构化数据展示
    if (typeof msg.content === 'object') {
      return <div key={idx} style={{ textAlign: 'left', margin: '8px 0' }}><Card size="small" title="MCP Response" style={{ display: 'inline-block', background: '#fafafa' }}><pre style={{ margin: 0, fontSize: 13 }}>{JSON.stringify(msg.content, null, 2)}</pre></Card></div>;
    }
    return <div key={idx} style={{ textAlign: 'left', margin: '8px 0' }}><Card size="small" style={{ display: 'inline-block', background: '#fafafa' }}>{msg.content}</Card></div>;
  };

  return (
    <>
      <Button type="primary" shape="circle" size="large" style={{ position: 'fixed', right: 32, bottom: 32, zIndex: 1001 }} onClick={() => setOpen(true)}>
        💬
      </Button>
      <Drawer
        title="MCP Chat"
        placement="right"
        width={400}
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }}
      >
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: '#f5f5f5' }}>
          {messages.map(renderMsg)}
        </div>
        <div style={{ padding: 16, borderTop: '1px solid #eee', background: '#fff' }}>
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 70px)' }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onPressEnter={handleSend}
              placeholder="Type a command..."
              autoFocus
            />
            <Button type="primary" onClick={handleSend}>Send</Button>
          </Input.Group>
        </div>
      </Drawer>
    </>
  );
};

export default ChatWidget; 