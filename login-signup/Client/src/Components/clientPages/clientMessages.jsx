import React, { useState } from 'react';
import '../sidebar.css';
import "./clientStyling/clientMessages.css";
import { Search, Star, Users, Trash2, ChevronRight, Mic, Paperclip, Send } from 'lucide-react';


const ClientMessages = () => {
  const [activeChat, setActiveChat] = useState('all');
  
  return (
    <div className="c-messages">
      {/* Messages Sidebar */}
      <div className="cm-sidebar">
        <button className="cm-sidebar__button cm-sidebar__button--active">
          <div className="cm-sidebar__button-content">
            <div className="cm-sidebar__icon-container">
              <ChevronRight size={20} />
            </div>
            <div className="cm-sidebar__text">
              <span className="cm-sidebar__title">All Inbox</span>
              <span className="cm-sidebar__subtitle">Access all your communications</span>
            </div>
          </div>
        </button>

        <button className="cm-sidebar__button">
          <div className="cm-sidebar__button-content">
            <div className="cm-sidebar__icon-container">
              <Users size={20} />
            </div>
            <div className="cm-sidebar__text">
              <span className="cm-sidebar__title">Staff</span>
              <span className="cm-sidebar__subtitle">Send your queries to our team</span>
            </div>
          </div>
        </button>

        <button className="cm-sidebar__button">
          <div className="cm-sidebar__button-content">
            <div className="cm-sidebar__icon-container">
              <Star size={20} />
            </div>
            <div className="cm-sidebar__text">
              <span className="cm-sidebar__title">Starred</span>
              <span className="cm-sidebar__subtitle">View your important messages</span>
            </div>
          </div>
        </button>

        <button className="cm-sidebar__button">
          <div className="cm-sidebar__button-content">
            <div className="cm-sidebar__icon-container">
              <Trash2 size={20} />
            </div>
            <div className="cm-sidebar__text">
              <span className="cm-sidebar__title">Deleted</span>
              <span className="cm-sidebar__subtitle">View your deleted messages</span>
            </div>
          </div>
        </button>
      </div>

      {/* Messages Content */}
      <div className="c-messages__content">
        {/* Header */}
        <div className="c-messages__header">
          <div className="c-messages__search">
            <input type="text" placeholder="Search Chat" />
            <button className="c-messages__search-btn">
              <Search size={20} />
            </button>
          </div>
          <div className="c-messages__user">
            <img src="/api/placeholder/40/40" alt="User" className="c-messages__user-avatar" />
            <div className="c-messages__user-info">
              <span className="c-messages__user-name">Nchangwe Reinhold</span>
              <span className="c-messages__user-role">Client</span>
            </div>
            <div className="c-messages__actions">
              <button className="c-messages__action-btn">
                <Star size={20} />
              </button>
              <button className="c-messages__action-btn">
                <span className="sr-only">Menu</span>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="c-messages__chat">
          <div className="c-messages__chat-container">
            {/* Message Bubbles */}
            <div className="c-messages__message c-messages__message--received">
              <img src="/api/placeholder/32/32" alt="" className="c-messages__message-avatar" />
              <div className="c-messages__message-content">
                <p>Yes Ms. Kuvare your ...</p>
                <span className="c-messages__message-time">08:52</span>
              </div>
            </div>

            <div className="c-messages__message c-messages__message--sent">
              <div className="c-messages__message-content">
                <p>Your invoice will be sent shortly</p>
                <span className="c-messages__message-time">08:12</span>
              </div>
            </div>

            <div className="c-messages__message c-messages__message--sent">
              <div className="c-messages__message-content c-messages__message-content--dark">
                <p>Have you received my payment for the Cruz Home Loan</p>
                <span className="c-messages__message-time">08:32</span>
              </div>
            </div>

            <div className="c-messages__message c-messages__message--received">
              <img src="/api/placeholder/32/32" alt="" className="c-messages__message-avatar" />
              <div className="c-messages__message-content">
                <p>Yes Ms. Kuvare your payment has been received</p>
                <span className="c-messages__message-time">08:52</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="c-messages__input">
            <input type="text" placeholder="Thank you very much for clarifying" />
            <div className="c-messages__input-actions">
              <button className="c-messages__input-btn">
                <Paperclip size={20} />
              </button>
              <button className="c-messages__input-btn">
                <Mic size={20} />
              </button>
              <button className="c-messages__input-btn c-messages__input-btn--send">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMessages;