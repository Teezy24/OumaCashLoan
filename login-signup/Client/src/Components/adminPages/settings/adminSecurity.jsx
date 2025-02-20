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
  )
}

export default AdminSecurity