import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../sidebar.css';
import { Home, FileText, Calculator, Clock, MessageSquare, Settings } from 'lucide-react'; // Example icons


function ClientSidebar() {
  return (
    <div className="sidebar-container">
    <div className="sidebar">
      <div className="logo-icon">
        <NavLink to="/" onClick={() => window.location.reload()} className='no-underline'>
          <img src="../assets/1.png" alt="Ouma Cash Loans" />
        </NavLink>
      </div>
        
        <ul className="c-sidebar-menu">
          <li>
            <NavLink to="/client-home" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <Home size={20} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/client-loan-application" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <FileText size={20} /> Loan Application
            </NavLink>
          </li>
          <li>
            <NavLink to="/client-loan-calculator" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <Calculator size={20} /> Loan Calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/client-loan-history" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <Clock size={20} /> Loan History
            </NavLink>
          </li>
          <li>
          <NavLink 
              to="/client-messages" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <MessageSquare size={20} /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/client-settings" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <Settings size={20} /> Settings
            </NavLink>
          </li>
        </ul>
        <NavLink to="/" className="logout-btn">
          Logout
        </NavLink>
      </div>
      <main className="content with-sidebar">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientSidebar;
