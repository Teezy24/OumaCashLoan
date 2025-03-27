import React, { useState } from 'react'; 
import "../clientStyling/clientSettings.css";
import { BellRing, Lock } from 'lucide-react';
import ClientNotifications from './clientNotifications';
import ClientSecurity from './clientSecurity';

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState('notifications');

  return (
    <div className="c-settings">
      {/* Settings Content Area */}
      <div className="c-settings__content">
        {/* Settings Navigation */}
        <div className="c-settings__nav">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`c-settings__nav-item ${
              activeTab === 'notifications' ? 'c-settings__nav-item--active' : ''
            }`}
          >
            <div className="c-settings__nav-icon">
              <BellRing size={20} />
            </div>
            <div className="c-settings__nav-text">
              <span>Notifications</span>
              <p>Manage app notifications and reminders.</p>
            </div>
            {activeTab !== 'notifications' && <span className="c-settings__nav-arrow">›</span>}
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`c-settings__nav-item ${
              activeTab === 'security' ? 'c-settings__nav-item--active' : ''
            }`}
          >
            <div className="c-settings__nav-icon">
              <Lock size={20} />
            </div>
            <div className="c-settings__nav-text">
              <span>Security</span>
              <p>Set up authentication and access.</p>
            </div>
            {activeTab !== 'security' && <span className="c-settings__nav-arrow">›</span>}
          </button>
        </div>

        {/* Settings Detail Area */}
        <div className="c-settings__detail">
          {activeTab === 'notifications' && <ClientNotifications />}
          {activeTab === 'security' && <ClientSecurity />}
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;