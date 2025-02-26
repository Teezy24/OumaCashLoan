// filepath: /path/to/LoanApplication.jsx
import React, { useState } from 'react';
import { Search, Filter } from "lucide-react";
import ClientLoanForm from './clientLoanForm';
import '../clientStyling/clientLoanApplication.css';

const LoanApplication = () => {
  const [view, setView] = useState('dashboard');

  const renderDashboard = () => (
    <div className="dashboard-container">
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => setView('loanApplication')}>
          <div className="card-icon loan-icon">
            <span>📝</span>
          </div>
          <h3>Apply for a Loan</h3>
          <p>Get Started on Your Loan Today!</p>
        </div>
        <div className="dashboard-card" onClick={() => setView('payment')}>
          <div className="card-icon payment-icon">
            <span>💵</span>
          </div>
          <h3>Make a Payment</h3>
          <p>Get Started on Your Loan Today!</p>
        </div>
        <div className="dashboard-card">
          <div className="card-icon discover-icon">
            <span>🔍</span>
          </div>
          <h3>Discover More</h3>
          <p>Explore Tips and Tools for Smarter Borrowing!</p>
        </div>
      </div>
  
      <div className="search-container">
        <div className="search-box">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <Search size={18} />
          </button>
        </div>
      </div>
  
      <div className="loans-section">
        <div className="loans-header">
          <div className="loans-title">
            <span className="loans-icon">📄</span>
            <h3>Loans</h3>
          </div>
          <button className="filter-button">
            <Filter size={18} />
            Filter
          </button>
        </div>
        
        <div className="loan-list">
          <div className="loan-item">
            <div className="loan-info">
              <div className="loan-id">#80149 - Cruz Home Loan</div>
              <div className="loan-badge approved">Approved</div>
            </div>
            <div className="loan-details">
              <div className="loan-detail">
                <span className="detail-icon">💰</span>
                <span>$250,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-icon">⏱️</span>
                <span>20 months</span>
              </div>
              <div className="loan-detail">
                <span className="detail-icon">📈</span>
                <span>5 percent interest</span>
              </div>
            </div>
            <div className="loan-type">
              <span className="type-icon">🏠</span>
              <span>Housing Loan</span>
              <span className="applied-text">applied 3d ago</span>
            </div>
            <button className="more-button">···</button>
          </div>
  
          <div className="loan-item">
            <div className="loan-info">
              <div className="loan-id">#79998- Horizon Auto Loan</div>
              <div className="loan-badge pending">Pending</div>
            </div>
            <div className="loan-details">
              <div className="loan-detail">
                <span className="detail-icon">💰</span>
                <span>$25,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-icon">⏱️</span>
                <span>10 months</span>
              </div>
              <div className="loan-detail">
                <span className="detail-icon">📈</span>
                <span>7 percent interest</span>
              </div>
            </div>
            <div className="loan-type">
              <span className="type-icon">🚗</span>
              <span>Auto Loan</span>
              <span className="applied-text">applied 4d ago</span>
            </div>
            <button className="more-button">···</button>
          </div>
  
          <div className="loan-item">
            <div className="loan-info">
              <div className="loan-id">#79844- Horizon Auto Loan</div>
              <div className="loan-badge rejected">Rejected</div>
            </div>
            <div className="loan-details">
              <div className="loan-detail">
                <span className="detail-icon">💰</span>
                <span>$30,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-icon">⏱️</span>
                <span>8 months</span>
              </div>
              <div className="loan-detail">
                <span className="detail-icon">📈</span>
                <span>10 percent interest</span>
              </div>
            </div>
            <div className="loan-type">
              <span className="type-icon">👤</span>
              <span>Personal Loan</span>
              <span className="applied-text">applied 5d ago</span>
            </div>
            <button className="more-button">···</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {view === 'dashboard' && renderDashboard()}
      {view === 'loanApplication' && <ClientLoanForm setView={setView} />}
      {view === 'payment' && <div>Payment Component</div>}
    </div>
  );
};

export default LoanApplication;