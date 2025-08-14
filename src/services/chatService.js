// Chat service for communicating with Campaign Journey Backend AI
const BACKEND_URL = 'http://localhost:8088';

class ChatService {
    constructor() {
        this.baseUrl = BACKEND_URL;
    }

    // Send a chat message to AI
    async sendMessage(message) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error sending chat message:', error);
            throw error;
        }
    }

    // Get AI-powered campaign advice
    async getCampaignAdvice(campaignType, targetAudience, budget) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/campaign-advice`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    campaignType,
                    targetAudience,
                    budget: parseFloat(budget)
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting campaign advice:', error);
            throw error;
        }
    }

    // Check chat service status
    async getChatStatus() {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/status`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking chat status:', error);
            throw error;
        }
    }

    // Test backend connection
    async testConnection() {
        try {
            const response = await fetch(`${this.baseUrl}/api/health`);
            return response.ok;
        } catch (error) {
            console.error('Backend connection test failed:', error);
            return false;
        }
    }
    
    // Intelligent conversation methods
    async intelligentChat(userId, message) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/intelligent-chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in intelligent chat:', error);
            throw error;
        }
    }
    
    async confirmParameters(userId, parameters) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/confirm-parameters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, parameters })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error confirming parameters:', error);
            throw error;
        }
    }
    
    async getSessionStatus(userId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/session-status/${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting session status:', error);
            throw error;
        }
    }
    
    async endSession(userId) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat/end-session/${userId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error ending session:', error);
            throw error;
        }
    }
}

export default new ChatService();
