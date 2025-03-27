import React, { useState } from 'react';
import "../adminStyling/adminSettings.css";
import { BellRing, Lock, Eye, EyeOff, Smartphone, Laptop, FileText, CreditCard, Shield } from 'lucide-react';
import AdminLoanSettings from './adminLoanSettings';
import AdminPayments from './adminPayments';
import AdminSecurity from './adminSecurity';
import UserManagement from './adminUserManagement';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('userManagement');

  return (
    <div className="a-settings">
      {/* Settings Content Area */}
      <div className="a-settings__content">
        {/* Settings Navigation */}
        <div className="a-settings__nav">
          <button
            onClick={() => setActiveTab('userManagement')}
            className={`a-settings__nav-item ${
              activeTab === 'userManagement' ? 'a-settings__nav-item--active' : ''
            }`}
          >
            <div className="a-settings__nav-icon">
              <Shield size={20} />
            </div>
            <div className="a-settings__nav-text">
              <span>User Management</span>
              <p>Manage users, roles, and permissions.</p>
            </div>
            {activeTab !== 'userManagement' && <span className="a-settings__nav-arrow">›</span>}
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`a-settings__nav-item ${
              activeTab === 'payments' ? 'a-settings__nav-item--active' : ''
            }`}
          >
            <div className="a-settings__nav-icon">
              <CreditCard size={20} />
            </div>
            <div className="a-settings__nav-text">
              <span>Payments</span>
              <p>Manage payment methods and history.</p>
            </div>
            {activeTab !== 'payments' && <span className="a-settings__nav-arrow">›</span>}
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`a-settings__nav-item ${
              activeTab === 'security' ? 'a-settings__nav-item--active' : ''
            }`}
          >
            <div className="a-settings__nav-icon">
              <Lock size={20} />
            </div>
            <div className="a-settings__nav-text">
              <span>Security</span>
              <p>Set up authentication and access.</p>
            </div>
            {activeTab !== 'security' && <span className="a-settings__nav-arrow">›</span>}
          </button>

          <button
            onClick={() => setActiveTab('loanSettings')}
            className={`a-settings__nav-item ${
              activeTab === 'loanSettings' ? 'a-settings__nav-item--active' : ''
            }`}
          >
            <div className="a-settings__nav-icon">
              <FileText size={20} />
            </div>
            <div className="a-settings__nav-text">
              <span>Loan Settings</span>
              <p>Configure loan types and terms.</p>
            </div>
            {activeTab !== 'loanSettings' && <span className="a-settings__nav-arrow">›</span>}
          </button>
        </div>

        {/* Settings Detail Area */}
        <div className="a-settings__detail">
          {activeTab === 'userManagement' && <UserManagement />}
          {activeTab === 'loanSettings' && <AdminLoanSettings />}
          {activeTab === 'payments' && <AdminPayments />}
          {activeTab === 'security' && <AdminSecurity />}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;