import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../css/sidebar.css';
import { Home, FileText, Calculator, Clock, MessageSquare, Settings } from 'lucide-react'; // Example icons
import logo from '../assets/1.png'


function ClientSidebar() {
  return (
    <div className="sidebar-container">
    <div className="sidebar">
      <div className="logo-icon">
        <NavLink to="/" onClick={() => window.location.reload()} className='no-underline'>
          <img src={logo} alt="Ouma Cash Loans" />
        </NavLink>
      </div>
        
        <ul className="c-sidebar-menu">
          <li>
            <NavLink to="/Dashboard" activeClassName="active">
              <Home size={20} /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ApplyforLoan" activeClassName="active">
              <FileText size={20} /> Loan Application
            </NavLink>
          </li>
          <li>
            <NavLink to="/calculate" activeClassName="active">
              <Calculator size={20} /> Loan Calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/loanhistory" activeClassName="active">
              <Clock size={20} /> Loan History
            </NavLink>
          </li>
          <li>
            <NavLink to="/client-messages" activeClassName="active">
              <MessageSquare size={20} /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink to="/client-settings" activeClassName="active">
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

export default ClientSidebar;
