import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../sidebar.css';


function ClientSidebar() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-logo">Ouma Cash Loans</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/client-home">Home</Link>
          </li>
          <li>
            <Link to="/client-loan-application">Loan Application</Link>
          </li>
          <li>
            <Link to="/client-loan-calculator">Loan Calculator</Link>
          </li>
          <li>
            <Link to="/client-loan-history">Loan History</Link>
          </li>
          <li>
            <Link to="/client-messages">Messages</Link>
          </li>
          <li>
            <Link to="/client-settings">Settings</Link>
          </li>
        </ul>
        <Link to="/logout" className="logout-btn">Logout</Link>
      </div>
      <main className="content with-sidebar">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientSidebar;