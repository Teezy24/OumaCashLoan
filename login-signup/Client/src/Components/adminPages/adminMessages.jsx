import React, { useState, useEffect, useRef } from 'react';
import { Send, Users } from 'lucide-react';
import axios from 'axios';
import './adminStyling/adminMessages.css';

const AdminMessages = () => {
  const [clients, setClients] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user'));

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
      const res = await axios.get('http://localhost:5000/api/users/clients');
      setClients(res.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${conversationId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const startChat = async (clientId) => {
    try {
      const res = await axios.post('http://localhost:5000/api/conversations', {
        client_id: clientId,
        admin_id: currentUser.user_id
      });
      setActiveChat(res.data);
    } catch (err) {
      console.error('Error starting chat:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      await axios.post('http://localhost:5000/api/messages', {
        conversation_id: activeChat.conversation_id,
        sender_id: currentUser.user_id,
        message_text: newMessage
      });
      setNewMessage('');
      fetchMessages(activeChat.conversation_id);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="c-messages">
      <div className="cm-sidebar">
        <div className="cm-sidebar__header">
          <h2>Clients</h2>
        </div>
        <div className="cm-sidebar__clients">
          {clients.map((client) => (
            <button
              key={client.user_id}
              onClick={() => startChat(client.user_id)}
              className={`cm-sidebar__button ${
                activeChat?.client_id === client.user_id ? 'cm-sidebar__button--active' : ''
              }`}
            >
              <div className="cm-sidebar__button-content">
                <Users size={20} />
                <div className="cm-sidebar__text">
                  <span className="cm-sidebar__title">{client.full_name}</span>
                  <span className="cm-sidebar__subtitle">{client.email}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="c-messages__content">
        {activeChat ? (
          <>
            <div className="c-messages__header">
              <h2>{activeChat.title}</h2>
            </div>

            <div className="c-messages__chat">
              <div className="c-messages__chat-container">
                {messages.map((message) => (
                  <div
                    key={message.message_id}
                    className={`c-messages__message ${
                      message.sender_id === currentUser.user_id 
                        ? 'c-messages__message--sent' 
                        : 'c-messages__message--received'
                    }`}
                  >
                    <p>{message.message_text}</p>
                    <span>{new Date(message.created_at).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>

              <form className="c-messages__input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit" className="c-messages__input-btn">
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="c-messages__empty">
            Select a client to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;