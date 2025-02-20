import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../sidebar.css';
import { Home, FileText, ChartNoAxesCombined ,MessageSquare, Settings } from 'lucide-react'; // Example icons


function adminSidebar() {
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
            <NavLink to="/admin-home" activeClassName="active">
              <Home size={20} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-loan-reviews" activeClassName="active">
              <FileText size={20} /> Loan Reviews
            </NavLink>
          </li>
          <li>
          <li>
            <NavLink to="/admin-analytics" activeClassName="active">
              <ChartNoAxesCombined size={20} /> Analytics
            </NavLink>
          </li>
            <NavLink to="/admin-messages" activeClassName="active">
              <MessageSquare size={20} /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-settings" activeClassName="active">
              <Settings size={20} /> Settings
            </NavLink>
          </li>
        </ul>
        <NavLink to="/logout" className="logout-btn">
          Logout
        </NavLink>
      </div>
      <main className="content with-sidebar">
        <Outlet />
      </main>
    </div>
  );
}

export default adminSidebar;
