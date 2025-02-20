import React from 'react'
import { useState } from 'react';
import "../adminStyling/adminSecurity.css"

import "../adminStyling/adminSettings.css"
import { FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaLock,FaCreditCard,FaUser,FaFileInvoiceDollar } from "react-icons/fa";


const AdminSecurity = () => {

    const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [passwordDuration, setPasswordDuration] = useState(90);
  const [lockoutDuration, setLockoutDuration] = useState(0);
  const [failedLogins, setFailedLogins] = useState(3);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleVerificationCodeChange = (event) => setVerificationCode(event.target.value);
  const handlePasswordDurationChange = (event) => setPasswordDuration(event.target.value);
  const handleLockoutDurationChange = (event) => setLockoutDuration(event.target.value);
  const handleFailedLoginsChange = (event) => setFailedLogins(event.target.value);
  const handleTwoFactorAuthChange = () => setTwoFactorAuth(!twoFactorAuth);


  return (
     <div className="dashboard-wrapper">
            {/* Sidebar */}
          <div className="sidebar">
            <div className="logo-container">
              <img src="../assets/3.png" alt="Logo" className="logo" /> 
            </div>
            <ul className="sidebar-links">
              <li>
                <FaHome className="sidebar-icon" />
                <span>Home</span>
              </li>
              <li>
                <FaFileAlt className="sidebar-icon" />
                <span>Loan Application</span>
              </li>
              <li>
                <FaEnvelope className="sidebar-icon" />
                <span>Message</span>
              </li>
              <li>
                <FaChartBar className="sidebar-icon" />
                <span>Analytics and Reports</span>
              </li>
              <li>
                <FaCog className="sidebar-icon" />
                <span>Settings</span>
              </li>
            </ul>
            <div className="logout-btn">
            <button>LOGOUT</button>
            </div>
          </div>

          <div className="container-2">
            <div className="first-sidebar">
                        <div className="white-container small">
                        <div className="setting-item">
                    <FaUser className="sidebar1-icon" /> 
                    <span className="sidebar1-item-text">User and Access Management</span>
                    <div className="sidebar1-item-description">Manage users and roles</div>
                  </div>
                  <div className="setting-item">
                    <FaFileInvoiceDollar className="sidebar1-icon" /> 
                    <span className="sidebar1-item-text">Loan Settings</span>
                    <div className="sidebar1-item-description">Adjust loan terms and rates.</div>
                  </div>
                  <div className="setting-item">
                    <FaCreditCard className="sidebar1-icon" /> 
                    <span className="sidebar1-item-text">Payments</span>
                    <div className="sidebar1-item-description">Track and configure transactions.</div>
                  </div>
                  <div className="setting-item">
                    <FaLock className="sidebar1-icon" />
                    <span className="sidebar1-item-text">Security</span>
                    <div className="sidebar1-item-description">Set up authentication and access.</div>
                  </div>
                    </div>
                  </div>
                        <div className="user-management">
                        <div className="white-container large">
                        <div className="user-settings-section">
        <h3>Password</h3>
        <p>Set a password to protect your account and evaluate its strength.</p>
        <div className="horizontally-placed">
        <div className="user-settings-input-group">
          <input type="password" value={password} onChange={handlePasswordChange} />
          <button className="password-toggle-button"></button> 
          <span className="password-strength">Very secure</span>
        </div>
        <button className="loan-settings-change-button-1">CHANGE</button>
      </div>
      </div>

      <div className="user-settings-section">
        <h3>Two-step verification</h3>
        <p>Add a second method of verification such as a security key or code in addition to your password.</p>
        <div className="user-settings-input-group">
          <select value={verificationCode} onChange={handleVerificationCodeChange}>
            <option value="">Verification Code</option>

          </select>
          <label className="toggle-switch">
            <input type="checkbox" checked={twoFactorAuth} onChange={handleTwoFactorAuthChange} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="user-settings-section">
        <h3>Session Management</h3>
        <p>Configure settings and govern user sessions.</p>

        <div className="user-settings-input-group">
          <label htmlFor="passwordDuration">User Password Duration:</label>
          <input type="number" id="passwordDuration" value={passwordDuration} onChange={handlePasswordDurationChange} />
          <button className="user-settings-change-button">CHANGE</button>
        </div>

        <div className="user-settings-input-group">
          <label htmlFor="lockoutDuration">User Lockout Duration:</label>
          <input type="number" id="lockoutDuration" value={lockoutDuration} onChange={handleLockoutDurationChange} />
          <button className="user-settings-change-button">CHANGE</button>
        </div>

        <div className="user-settings-input-group">
          <label htmlFor="failedLogins">User Max Failed Logins Before Lockout:</label>
          <input type="number" id="failedLogins" value={failedLogins} onChange={handleFailedLoginsChange} />
          <button className="user-settings-change-button">CHANGE</button>
        </div>
      </div>
     </div>
     </div>
    </div>
    </div>
  )
}

export default AdminSecurity