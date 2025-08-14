# ReactFlow + Campaign Journey Backend AI Chat Integration

This document explains how to set up and use the AI chat integration between ReactFlow frontend and Campaign Journey Backend.

## 🏗️ Architecture Overview

```
ReactFlow Frontend (Port 5173) ←→ Campaign Journey Backend (Port 8088)
                ↓                                    ↓
        ChatWidget Component                 AI Chat API
                ↓                                    ↓
        chatService.js                    ChatController
                ↓                                    ↓
        HTTP Requests                    MarketingCampaignService
                ↓                                    ↓
                                        Spring AI + OpenAI/Azure
```

## 🚀 Setup Instructions

### 1. Start the Backend Server

```bash
cd campaign-journey-backend
./start-mcp-server.sh
```

The backend will start on port 8088 with:
- MCP Server (stdio transport)
- AI Chat API endpoints
- Swagger documentation

### 2. Start the ReactFlow Frontend

```bash
cd reactflow-campaign-demo
npm run dev
```

The frontend will start on port 5173.

### 3. Verify Connection

- Backend health check: http://localhost:8088/api/health
- Swagger UI: http://localhost:8088/swagger-ui.html
- Frontend: http://localhost:5173

## 💬 Chat Features

### Basic Chat
- Send messages to AI about marketing campaigns
- Get real-time AI responses
- View conversation history

### Campaign Advice
- One-click campaign advice generation
- Customizable parameters (type, audience, budget)
- Structured AI recommendations

### Connection Status
- Real-time backend connection monitoring
- Visual status indicators
- Manual connection refresh

## 🔌 API Endpoints

### Chat API (`/api/chat`)

#### POST `/api/chat/send`
Send a message to AI and get response.

**Request:**
```json
{
  "message": "How do I create a successful email campaign?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "How do I create a successful email campaign?",
  "aiResponse": "To create a successful email campaign...",
  "timestamp": 1640995200000
}
```

#### POST `/api/chat/campaign-advice`
Get AI-powered campaign advice.

**Request:**
```json
{
  "campaignType": "Digital Marketing",
  "targetAudience": "Young professionals aged 25-35",
  "budget": 50000
}
```

**Response:**
```json
{
  "success": true,
  "campaignType": "Digital Marketing",
  "targetAudience": "Young professionals aged 25-35",
  "budget": 50000,
  "advice": "Comprehensive campaign strategy...",
  "timestamp": 1640995200000
}
```

#### GET `/api/chat/status`
Check chat service availability.

## 🎯 Usage Examples

### 1. Ask About Campaign Strategy
```
User: "What's the best approach for a B2B marketing campaign?"
AI: "For B2B marketing campaigns, focus on..."
```

### 2. Get Audience Insights
```
User: "How should I segment my target audience for insurance products?"
AI: "Consider these key segmentation factors..."
```

### 3. Channel Strategy
```
User: "Which channels work best for reaching millennials?"
AI: "Millennials are most active on..."
```

### 4. Budget Optimization
```
User: "How should I allocate a $100k marketing budget?"
AI: "Here's a recommended budget allocation..."
```

## 🔧 Configuration

### Backend Configuration (`application.yml`)
```yaml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      model: ${OPENAI_MODEL:gpt-4}
    mcp:
      server:
        enabled: true
        transport: stdio

springdoc:
  swagger-ui:
    enabled: true
    path: /swagger-ui.html
```

### Frontend Configuration (`chatService.js`)
```javascript
const BACKEND_URL = 'http://localhost:8088';
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Check if backend is running on port 8088
   - Verify firewall settings
   - Check backend logs for errors

2. **AI Responses Not Working**
   - Verify OpenAI API key is set
   - Check backend AI service logs
   - Ensure MCP server is properly configured

3. **CORS Errors**
   - Backend has `@CrossOrigin(origins = "*")`
   - Check browser console for CORS issues

4. **Chat Widget Not Loading**
   - Verify frontend dependencies are installed
   - Check browser console for JavaScript errors
   - Ensure chatService.js is properly imported

### Debug Steps

1. **Check Backend Status**
   ```bash
   curl http://localhost:8088/api/health
   ```

2. **Test Chat API**
   ```bash
   curl -X POST http://localhost:8088/api/chat/send \
     -H "Content-Type: application/json" \
     -d '{"message":"Hello AI"}'
   ```

3. **Check Frontend Console**
   - Open browser developer tools
   - Look for network requests
   - Check for JavaScript errors

## 📱 Frontend Components

### ChatWidget
- Main chat interface
- Message history
- Campaign advice button
- Connection status

### chatService
- HTTP client for backend communication
- Error handling
- Response processing

## 🔒 Security Considerations

- Backend allows CORS from any origin (development only)
- API endpoints are public (no authentication)
- Consider adding authentication for production use
- OpenAI API keys should be secured

## 🚀 Production Deployment

### Environment Variables
```bash
export OPENAI_API_KEY="your-production-key"
export OPENAI_MODEL="gpt-4"
export SERVER_PORT="8088"
```

### Security
- Enable authentication
- Restrict CORS origins
- Use HTTPS
- Rate limiting
- API key rotation

## 📚 Additional Resources

- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [MCP Protocol](https://modelcontextprotocol.io/)
- [ReactFlow Documentation](https://reactflow.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
