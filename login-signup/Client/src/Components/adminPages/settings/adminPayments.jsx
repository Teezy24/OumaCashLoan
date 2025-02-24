import React, { useState } from 'react';
import { FaCreditCard, FaFileInvoiceDollar, FaFileAlt } from "react-icons/fa";
import '../adminStyling/adminPayments.css';
const AdminPayments = () => {
  const [activeTab, setActiveTab] = useState('financialDetails');
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
    <div className="ap-container">
      <div className="ap-tabs">
        <div className={`ap-tab ${activeTab === 'financialDetails' ? 'active' : ''}`} onClick={() => setActiveTab('financialDetails')}>
          <FaFileInvoiceDollar className="ap-tab-icon" />
          <span className="ap-tab-text">Financial Details</span>
        </div>
        <div className={`ap-tab ${activeTab === 'loanPayments' ? 'active' : ''}`} onClick={() => setActiveTab('loanPayments')}>
          <FaFileAlt className="ap-tab-icon" />
          <span className="ap-tab-text">Loan Payments</span>
        </div>
        <div className={`ap-tab ${activeTab === 'transactionHistory' ? 'active' : ''}`} onClick={() => setActiveTab('transactionHistory')}>
          <FaFileAlt className="ap-tab-icon" />
          <span className="ap-tab-text">Transaction History</span>
        </div>
      </div>

      <div className="ap-main-content">
        {activeTab === 'financialDetails' && (
          <div className="ap-section">
            <div className="ap-section-header">
              <h3 className="ap-section-title">Financial Details</h3>
              <p className="ap-section-description">Update your banking information.</p>
            </div>
            <div className="ap-input-group">
              <input type="text" id="bankName" placeholder="Bank Name" value={bankName} onChange={handleBankNameChange} />
            </div>
            <div className="ap-input-group">
              <input type="text" id="accountNumber" placeholder="Bank Account Number" value={accountNumber} onChange={handleAccountNumberChange} />
            </div>
            <button className="ap-change-button">CHANGE</button>
          </div>
        )}

        {activeTab === 'loanPayments' && (
          <div className="ap-section">
            <div className="ap-section-header">
              <h3 className="ap-section-title">Loan Payments</h3>
              <p className="ap-section-description">Track loan payments and outstanding balances.</p>
            </div>
            <table className="ap-table">
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
                      <div className="ap-progress-bar">
                        <div className="ap-progress" style={{ width: `${payment.progress}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'transactionHistory' && (
          <div className="ap-section">
            <div className="ap-section-header">
              <h3 className="ap-section-title">Transaction History</h3>
              <p className="ap-section-description">View transaction history and generate statements.</p>
            </div>
            <button className="ap-view-history-button">VIEW HISTORY</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;