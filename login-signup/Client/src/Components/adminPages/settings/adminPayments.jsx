import React from 'react'
import { useState } from 'react';
import "../adminstyles/loanPayments.css"
import { FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaLock,FaCreditCard,FaUser,FaFileInvoiceDollar } from "react-icons/fa";

const AdminPayments = () => {

    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
  
    const handleBankNameChange = (event) => setBankName(event.target.value);
    const handleAccountNumberChange = (event) => setAccountNumber(event.target.value);

    const loanPayments = [
        { description: 'Grow ARR by 20%', client: 'Miranda Cloete', progress: 75 },
        { description: 'Build a sustainable business', client: 'Sonder Vane', progress: 50 },
        { description: 'Win customer loyalty', client: 'Sonder Vane', progress: 25 },
        { description: 'Grow and engage teams', client: 'Chante Louw', progress: 90 },
        { description: 'Delight new customers', client: 'Chante Louw', progress: 60 },
        { description: 'Maximize velocity', client: 'Miranda Cloete', progress: 40 },
      ];
  

  return (
    <div className="dashboard-wrapper">
                {/* Sidebar */}
              <div className="sidebar">
                <div className="logo-container">
                  <img src="../assets/3.png" alt="Logo" className="logo" /> 
                </div>
                <ul className="sidebar-links">
                  <li>
                    <FaHome className="sidebar-icon" />
                    <span>Home</span>
                  </li>
                  <li>
                    <FaFileAlt className="sidebar-icon" />
                    <span>Loan Application</span>
                  </li>
                  <li>
                    <FaEnvelope className="sidebar-icon" />
                    <span>Message</span>
                  </li>
                  <li>
                    <FaChartBar className="sidebar-icon" />
                    <span>Analytics and Reports</span>
                  </li>
                  <li>
                    <FaCog className="sidebar-icon" />
                    <span>Settings</span>
                  </li>
                </ul>
                <div className="logout-btn">
                <button>LOGOUT</button>
                </div>
              </div>
              <div className="container-3">
                          <div className="first-sidebar">
                                      <div className="white-container small-2">
                                      <div className="setting-item">
                                  <FaUser className="sidebar1-icon" /> 
                                  <span className="sidebar1-item-text">User and Access Management</span>
                                  <div className="sidebar1-item-description">Manage users and roles</div>
                                </div>
                                <div className="setting-item">
                                  <FaFileInvoiceDollar className="sidebar1-icon" /> 
                                  <span className="sidebar1-item-text">Loan Settings</span>
                                  <div className="sidebar1-item-description">Adjust loan terms and rates.</div>
                                </div>
                                <div className="setting-item">
                                  <FaCreditCard className="sidebar1-icon" /> 
                                  <span className="sidebar1-item-text">Payments</span>
                                  <div className="sidebar1-item-description">Track and configure transactions.</div>
                                </div>
                                <div className="setting-item">
                                  <FaLock className="sidebar1-icon" />
                                  <span className="sidebar1-item-text">Security</span>
                                  <div className="sidebar1-item-description">Set up authentication and access.</div>
                                </div>
                                  </div>
                                </div>
                                      <div className="user-management">
                                      <div className="white-container large-2">
                                      <div className="financial-details-section">
        <h3>Financial Details</h3>
        <p>Update your banking information.</p>
        <div className="horizontally-placed">
        <div className="financial-details-input-group">
          <input type="text" id="bankName" placeholder="Bank Name" value={bankName} onChange={handleBankNameChange} />
        </div>
        <div className="financial-details-input-group">
          <input type="text" id="accountNumber" placeholder="Bank Account Number" value={accountNumber} onChange={handleAccountNumberChange} />
        </div>
        <button className="financial-details-change-button">CHANGE</button>
      </div>
      </div>

      <div className="financial-details-section">
        <h3>Loan Payments</h3>
        <p>Track loan payments and outstanding balances.</p>
        <table className="loan-payments-table">
          <thead>
            <tr>
              <th>Loan Description</th>
              <th>Client Name</th>
              <th>Payment Progress</th>
            </tr>
          </thead>
          <tbody>
            {loanPayments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.description}</td>
                <td>{payment.client}</td>
                <td>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${payment.progress}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="financial-details-section">
        <h3>Transaction History</h3>
        <p>View transaction history and generate statements.</p>
        <button className="view-history-button">VIEW HISTORY</button>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default AdminPayments