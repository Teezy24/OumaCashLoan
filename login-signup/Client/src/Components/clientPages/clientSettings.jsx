import React, { useState } from 'react'; 
import "./clientStyling/clientSettings.css";
import { BellRing, Lock, Eye, EyeOff, Smartphone, Laptop } from 'lucide-react';


const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [showPassword, setShowPassword] = useState(false);

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
          {activeTab === 'notifications' && (
            <div className="c-settings__notifications">
              <h2>Notify me when...</h2>
              <div className="c-settings__checkbox-group">
                <label className="c-settings__checkbox">
                  <input type="checkbox" />
                  <span>Loan payment is due</span>
                </label>
                <label className="c-settings__checkbox">
                  <input type="checkbox" />
                  <span>Payment is successfully processed</span>
                </label>
                <label className="c-settings__checkbox">
                  <input type="checkbox" />
                  <span>Loan application status is updated</span>
                </label>
              </div>

              <div className="c-settings__toggle-group">
                <div className="c-settings__toggle-item">
                  <div>
                    <h3>Mobile Push Notifications</h3>
                    <p>Receive push notifications for important loan updates.</p>
                  </div>
                  <label className="c-settings__toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="c-settings__toggle-slider"></span>
                  </label>
                </div>

                <div className="c-settings__toggle-item">
                  <div>
                    <h3>Desktop Notifications</h3>
                    <p>Get alerts on loan approvals, due dates, and transactions.</p>
                  </div>
                  <label className="c-settings__toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="c-settings__toggle-slider"></span>
                  </label>
                </div>

                <div className="c-settings__toggle-item">
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive email updates about loan activities and account changes.</p>
                  </div>
                  <label className="c-settings__toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="c-settings__toggle-slider"></span>
                  </label>
                </div>

                <div className="c-settings__toggle-item">
                  <div>
                    <h3>Chat Notifications</h3>
                    <p>Get notified of messages sent to your message box.</p>
                  </div>
                  <label className="c-settings__toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="c-settings__toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="c-settings__security">
              <div className="c-settings__security-section">
                <h2>Password</h2>
                <p>Set a password to protect your account and evaluate its strength.</p>
                <div className="c-settings__password-field">
                  <div className="c-settings__password-input">
                    <input type={showPassword ? 'text' : 'password'} value="••••••••••••" readOnly />
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="c-settings__password-strength">
                    <span className="c-settings__strength-indicator">Very secure</span>
                  </div>
                  <button className="c-settings__change-btn">CHANGE</button>
                </div>
              </div>

              <div className="c-settings__security-section">
                <h2>Two-step verification</h2>
                <p>Add a second method of verification such as a security key or code in addition to your password.</p>
                <div className="c-settings__2fa">
                  <select className="c-settings__2fa-select">
                    <option>Verification Code</option>
                  </select>
                  <label className="c-settings__toggle">
                    <input type="checkbox" />
                    <span className="c-settings__toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="c-settings__security-section">
                <h2>Linked Devices</h2>
                <p>Manage linked devices.</p>
                <div className="c-settings__devices">
                  <table className="c-settings__devices-table">
                    <thead>
                      <tr>
                        <th>Device Name</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="c-settings__device-info">
                            <Smartphone size={20} />
                            <span>Samsung A05</span>
                          </div>
                        </td>
                        <td><span className="c-settings__status c-settings__status--active">Active</span></td>
                        <td><button className="c-settings__remove-btn">REMOVE</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="c-settings__device-info">
                            <Smartphone size={20} />
                            <span>iPhone 14 Pro</span>
                          </div>
                        </td>
                        <td><span className="c-settings__status">Offline</span></td>
                        <td><button className="c-settings__remove-btn">REMOVE</button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="c-settings__device-info">
                            <Laptop size={20} />
                            <span>Dell Inspiron 14 Plus</span>
                          </div>
                        </td>
                        <td><span className="c-settings__status">Offline</span></td>
                        <td><button className="c-settings__remove-btn">REMOVE</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;