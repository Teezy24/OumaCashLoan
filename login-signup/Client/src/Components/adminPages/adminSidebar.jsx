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
            <NavLink to="/admin-home" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <Home size={20} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-loan-reviews" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <FileText size={20} /> Loan Reviews
            </NavLink>
          </li>
          <li>
          <li>
            <NavLink to="/admin-analytics" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <ChartNoAxesCombined size={20} /> Analytics
            </NavLink>
          </li>
            <NavLink to="/admin-messages" className={({ isActive }) => (isActive ? "some-class" : "")}>
              <MessageSquare size={20} /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-settings" className={({ isActive }) => (isActive ? "some-class" : "")}>
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

export default adminSidebar;
