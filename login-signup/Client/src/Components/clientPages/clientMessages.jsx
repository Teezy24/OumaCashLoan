import React, { useState, useEffect, useContext } from 'react';
import { Send, Users } from 'lucide-react';
import axios from 'axios';
import './clientStyling/clientMessages.css';
import { UserContext } from '../../UserContext'; // Import UserContext

const ClientMessages = () => {
  const { user: currentUser } = useContext(UserContext); // Use UserContext to get the current user
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch or create conversation on component mount
  useEffect(() => {
    if (currentUser) {
      fetchOrCreateAdminChat();
    }
  }, [currentUser]);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.conversation_id);
    }
  }, [activeChat]);

  const fetchOrCreateAdminChat = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/conversations/client/${currentUser.user_id}`);
      setActiveChat(res.data);
    } catch (err) {
      console.error('Error fetching admin chat:', err);
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
          <h2>Admin Support</h2>
        </div>
        {activeChat && (
          <div className="cm-sidebar__admin">
            <div className="cm-sidebar__button cm-sidebar__button--active">
              <div className="cm-sidebar__button-content">
                <Users size={20} />
                <div className="cm-sidebar__text">
                  <span className="cm-sidebar__title">{activeChat.admin_name}</span>
                  <span className="cm-sidebar__subtitle">Support Agent</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="c-messages__content">
        {activeChat ? (
          <>
            <div className="c-messages__header">
              <h2>Chat with Support</h2>
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
                    <div className="c-messages__message-content">
                      <p>{message.message_text}</p>
                      <span className="c-messages__message-time">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
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
            Connecting to support...
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientMessages;