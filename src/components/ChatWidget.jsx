import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Card, Typography, Divider, Spin } from 'antd';
import chatService from '../services/chatService';
import { CompatibleAlert, CompatibleSpace } from './CompatibleComponents';

const { TextArea } = Input;
const { Title, Text } = Typography;

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('unknown');
  const [campaignAdvice, setCampaignAdvice] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    checkBackendStatus();
  }, [messages]);

  const checkBackendStatus = async () => {
    try {
      const isConnected = await chatService.testConnection();
      setBackendStatus(isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      setBackendStatus('error');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(inputMessage);
      
      if (response.success) {
        const aiMessage = {
          id: Date.now() + 1,
          text: response.aiResponse,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(response.error || 'Failed to get AI response');
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        sender: 'error',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCampaignAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await chatService.getCampaignAdvice(
        'Digital Marketing',
        'Young professionals aged 25-35',
        50000
      );
      
      if (response.success) {
        setCampaignAdvice(response.advice);
      } else {
        throw new Error(response.error || 'Failed to get campaign advice');
      }
    } catch (error) {
      console.error('Error getting campaign advice:', error);
      setCampaignAdvice(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusType = () => {
    switch (backendStatus) {
      case 'connected': return 'success';
      case 'disconnected': return 'error';
      case 'error': return 'warning';
      default: return 'info';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'connected': return 'Backend Connected';
      case 'disconnected': return 'Backend Disconnected';
      case 'error': return 'Connection Error';
      default: return 'Checking Status...';
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* 抽屉触发器 - 固定在右下角 */}
      <div
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          bottom: 220,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: '#1890ff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1001,
          transition: 'all 0.3s ease',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.backgroundColor = '#40a9ff';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = '#1890ff';
        }}
      >
        {isDrawerOpen ? '×' : '💬'}
      </div>

      {/* 抽屉内容 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: isDrawerOpen ? 0 : '-400px',
          width: 400,
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: isDrawerOpen ? '-4px 0 12px rgba(0,0,0,0.15)' : 'none',
          zIndex: 1000,
          transition: 'right 0.3s ease',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* 抽屉头部 */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #f0f0f0',
            backgroundColor: '#fafafa',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Title level={4} style={{ margin: 0 }}>AI Campaign Assistant</Title>
          <CompatibleAlert
            message={getStatusText()}
            type={getStatusType()}
            showIcon
            size="small"
            style={{ fontSize: '10px' }}
          />
        </div>

        {/* 抽屉内容区域 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Campaign Advice Section */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
            <Button 
              type="primary" 
              onClick={handleGetCampaignAdvice}
              loading={isLoading}
              block
            >
              Get Campaign Advice
            </Button>
            
            {campaignAdvice && (
              <div style={{ marginTop: 12 }}>
                <Divider style={{ margin: '8px 0' }} />
                <Text strong>Campaign Advice:</Text>
                <div style={{ 
                  marginTop: 8, 
                  padding: 8, 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: 4,
                  maxHeight: 150,
                  overflowY: 'auto'
                }}>
                  <Text style={{ whiteSpace: 'pre-wrap' }}>{campaignAdvice}</Text>
                </div>
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div style={{ 
            flex: 1,
            padding: '16px 20px',
            overflowY: 'auto'
          }}>
            {messages.length === 0 && !isLoading && (
              <div style={{ 
                textAlign: 'center', 
                color: '#999', 
                marginTop: '40px',
                fontSize: '14px'
              }}>
                👋 Welcome! Start a conversation about marketing campaigns.
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: 12,
                  textAlign: message.sender === 'user' ? 'right' : 'left'
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    padding: '10px 14px',
                    borderRadius: 18,
                    backgroundColor: message.sender === 'user' 
                      ? '#1890ff' 
                      : message.sender === 'error'
                      ? '#ff4d4f'
                      : '#f0f0f0',
                    color: message.sender === 'user' ? 'white' : 'black',
                    maxWidth: '80%',
                    wordWrap: 'break-word'
                  }}
                >
                  <Text style={{ 
                    color: message.sender === 'user' ? 'white' : 'inherit',
                    fontSize: '13px'
                  }}>
                    {message.text}
                  </Text>
                  <div style={{ 
                    fontSize: '11px', 
                    opacity: 0.7, 
                    marginTop: 6 
                  }}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ textAlign: 'left', marginBottom: 12 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 14px',
                  borderRadius: 18,
                  backgroundColor: '#f0f0f0'
                }}>
                  <Spin size="small" /> AI is thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div style={{ 
            padding: '16px 20px', 
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fafafa'
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <TextArea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about marketing campaigns..."
                autoSize={{ minRows: 1, maxRows: 3 }}
                onPressEnter={(e) => {
                  if (!e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                style={{ flex: 1 }}
              />
              <Button
                type="primary"
                onClick={handleSendMessage}
                loading={isLoading}
                disabled={!inputMessage.trim()}
              >
                Send
              </Button>
            </div>

            {/* Connection Status */}
            <div style={{ textAlign: 'center' }}>
              <CompatibleSpace>
                <Button 
                  size="small" 
                  onClick={checkBackendStatus}
                  loading={backendStatus === 'unknown'}
                >
                  Refresh Status
                </Button>
              </CompatibleSpace>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget; 