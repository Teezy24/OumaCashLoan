import React from 'react';
import { FaLock, FaUserShield, FaShieldAlt } from "react-icons/fa";
import '../adminStyling/adminSecurity.css';

const AdminSecurity = () => {
  return (
    <div className="security-page">
      <div className="security-privacy">
        <div className="security-content">
          <div className="top-section">
            <h1 className="heading">Security Settings</h1>
            <p className="section-title-1">Manage your security settings here.</p>
          </div>
          <div className="main-content">
            <div className="left-side">
              <h2>Security Options</h2>
              <p>Configure your security options here.</p>
            </div>
            <div className="video-placeholder">
              <span className="video-icon">Video</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;