import React, { useState } from 'react';
import { FaUser, FaFileInvoiceDollar, FaCreditCard, FaLock } from "react-icons/fa";
import UserManagement from './adminUserManagement';
import LoanSettings from './adminLoanSettings';
import AdminPayments from './adminPayments';
import AdminSecurity from './adminSecurity';
import "../adminStyling/adminSettings.css";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    {
      id: 'users',
      icon: <FaUser className="sidebar1-icon" />,
      title: 'User Management',
      description: 'Manage users and roles',
      component: <UserManagement />
    },
    {
      id: 'loans',
      icon: <FaFileInvoiceDollar className="sidebar1-icon" />,
      title: 'Loan Settings',
      description: 'Adjust loan terms and rates',
      component: <LoanSettings />
    },
    {
      id: 'payments',
      icon: <FaCreditCard className="sidebar1-icon" />,
      title: 'Payments',
      description: 'Track and configure transactions',
      component: <AdminPayments />
    },
    {
      id: 'security',
      icon: <FaLock className="sidebar1-icon" />,
      title: 'Security',
      description: 'Set up authentication and access',
      component: <AdminSecurity />
    }
  ];

  const renderContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData ? activeTabData.component : <UserManagement />;
  };

  return (
    <div className="wrapper-1">
      <div className="container-2">
        <div className="first-sidebar">
          <div className="white-container small">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`setting-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="sidebar1-item-text">{tab.title}</span>
                <div className="sidebar1-item-description">{tab.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;