import React, { useState, useEffect, useContext } from 'react';
import { Send, Users } from 'lucide-react';
import { AuthContext } from '../../AuthContext'; // Import the AuthContext
import api from '../../axiosConfig'; // Import the configured Axios instance
import './adminStyling/adminMessages.css';

const AdminMessages = () => {
  const { user } = useContext(AuthContext); // Use the AuthContext
  const [clients, setClients] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);

  // Fetch clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.conversation_id);
    }
  }, [activeChat]);

  const fetchClients = async () => {
    try {
      const res = await api.get('/users/clients');
      setClients(res.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to fetch clients. Please try again later.');
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const res = await api.get(`/messages/${conversationId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to fetch messages. Please try again later.');
    }
  };

  const startChat = async (clientId) => {
    if (!user || !user.user_id) {
      setError('User not authenticated. Please log in.');
      return;
    }

    try {
      const res = await api.post('/conversations', {
        client_id: clientId,
        admin_id: user.user_id
      });
      setActiveChat(res.data);
    } catch (err) {
      console.error('Error starting chat:', err);
      setError('Failed to start chat. Please try again later.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      await api.post('/messages', {
        conversation_id: activeChat.conversation_id,
        sender_id: user.user_id,
        message_text: newMessage
      });
      setNewMessage('');
      fetchMessages(activeChat.conversation_id);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again later.');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="a-messages">
      <div className="am-sidebar">
        <div className="am-sidebar__header">
          <h2>Clients</h2>
        </div>
        <div className="am-sidebar__clients">
          {clients.map((client) => (
            <button
              key={client.user_id}
              onClick={() => startChat(client.user_id)}
              className={`am-sidebar__button ${
                activeChat?.client_id === client.user_id ? 'am-sidebar__button--active' : ''
              }`}
            >
              <div className="am-sidebar__button-content">
                <Users size={20} />
                <div className="am-sidebar__text">
                  <span className="am-sidebar__title">{client.full_name}</span>
                  <span className="am-sidebar__subtitle">{client.email}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="a-messages__content">
        {error && <div className="a-messages__error">{error}</div>}
        {activeChat ? (
          <>
            <div className="a-messages__header">
              <h2>{activeChat.client_name}</h2>
            </div>

            <div className="a-messages__chat">
              <div className="a-messages__chat-container">
                {messages.map((message) => (
                  <div
                    key={message.message_id}
                    className={`a-messages__message ${
                      message.sender_id === user.user_id 
                        ? 'a-messages__message--sent' 
                        : 'a-messages__message--received'
                    }`}
                  >
                    <p>{message.message_text}</p>
                    <span>{formatTime(message.created_at)}</span>
                  </div>
                ))}
              </div>

              <form className="a-messages__input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit" className="a-messages__input-btn">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="a-messages__empty">
            Select a client to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;