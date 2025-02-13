import React, { useState } from "react";
import "../css/sidebar.css";
import  {CiCircleList} from 'react-icons/ci'
import {MdOutlineDashboardCustomize} from 'react-icons/md'
import {FaMoneyBillWave, FaHistory} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>

      
      <nav className = "nav-section">
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? <CiCircleList/> :<CiCircleList/>}
      </button>
        <div>
            <Link to = {'/Dashboard'}>
        <button className = "nav-button"><MdOutlineDashboardCustomize className = 'sidebar-icon'/><p>Dashboard</p> </button>
        </Link>
        </div>
        <div>
        <Link to = {'/homeloanapplication'}>
        <button className = "nav-button"><FaMoneyBillWave className = 'sidebar-icon'/><p>Apply for Loan</p> </button>
        </Link>
        </div>
        <div>
        <Link to = {'/Loanhistory'}>
        <button className = "nav-button"><FaHistory className="sidebar-icon"/><p>Loan History</p>  </button>
        </Link>
        </div>
        <div>
        <Link to = {'/calculate'}>
        <button className = "nav-button"><p>Installment Calculator</p></button>
        </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;