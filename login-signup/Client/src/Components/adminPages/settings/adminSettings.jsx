import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
// import UserManagement from './aUserManagement';
// import LoanSettings from './LoanSettings';
// import PaymentsSettings from './PaymentsSettings';
import AdminSecurity from './adminSecurity';
import {  FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaLock,FaUserPlus,FaTrashAlt,FaUser, FaCreditCard, FaFileInvoiceDollar} from "react-icons/fa";
import "../adminStyling/adminSettings.css"

const AdminSettings = () => {
  return (
    <div className="wrapper-1">
      <div className="container-2">
        {/* Sidebar Navigation */}
        <div className="first-sidebar">
          <div className="white-container small">
            {/* {/* <NavLink to="/adminPages/settings/users" className="setting-item">
              <FaUser className="sidebar1-icon" />
              {/* <span className="sidebar1-item-text">User Management</span>
            </NavLink>

            <NavLink to="/adminPages/settings/loans" className="setting-item">
              <FaFileInvoiceDollar className="sidebar1-icon" />
              <span className="sidebar1-item-text">Loan Settings</span>
            </NavLink>

            <NavLink to="/adminPages/settings/payments" className="setting-item">
              <FaCreditCard className="sidebar1-icon" />
              <span className="sidebar1-item-text">Payments</span>
            </NavLink> */}  

            <NavLink to="/adminPages/settings/security" className="setting-item">
              <FaLock className="sidebar1-icon" />
              <span className="sidebar1-item-text">Security</span>
            </NavLink>
          </div>
        </div>
    
          {/* Settings Content - Matches Route */}
        <div className="user-management">
          <Routes>
            {/* <Route path="/admin/settings/users" element={<UserManagement />} />
            <Route path="/admin/settings/loans" element={<LoanSettings />} />
            <Route path="/admin/settings/payments" element={<PaymentsSettings />} /> */}
            <Route path="/admin/settings/security" element={<AdminSecurity />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;