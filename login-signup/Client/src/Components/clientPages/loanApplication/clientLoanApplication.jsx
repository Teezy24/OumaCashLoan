import React, { useState, useEffect } from 'react';
import { Search, Filter } from "lucide-react";
import ClientLoanForm from './clientLoanForm';
import '../clientStyling/clientLoanApplication.css';
import axios from 'axios';

const LoanApplication = ({ user_id }) => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/loanApplications', { withCredentials: true });
        console.log('Response data:', response.data);
        
        if (Array.isArray(response.data)) {
          setLoanApplications(response.data);
        } else if (response.data.error) {
          console.error('API Error:', response.data.error);
          setLoanApplications([]); // Handle authentication error
        } else {
          console.error('Unexpected response format:', response.data);
          setLoanApplications([]);
        }
      } catch (error) {
        console.error('Error fetching loan applications:', error);
        setLoanApplications([]);
      }
    };
    
    fetchLoanApplications();
  }, [user_id]);

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
          {loanApplications.length > 0 ? (
            loanApplications.map((loan) => (
              <div className="loan-item modern-loan-item" key={loan.id}>
                <div className="loan-info">
                  <div className="loan-id">#{loan.id} - {loan.full_name}</div>
                  <div className={`loan-badge ${loan.status.toLowerCase()}`}>{loan.status}</div>
                </div>
                <div className="loan-details">
                  <div className="loan-detail">
                    <span className="detail-icon">💰</span>
                    <span>${loan.loan_amount}</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-icon">⏱️</span>
                    <span>{loan.period} months</span>
                  </div>
                  <div className="loan-detail">
                    <span className="detail-icon">📈</span>
                    <span>{loan.interest_rate}% interest</span>
                  </div>
                </div>
                <div className="loan-type">
                  <span className="type-icon">🏠</span>
                  <span>{loan.loan_type}</span>
                  <span className="applied-text">applied {loan.applied_date}</span>
                </div>
                <button className="more-button">···</button>
              </div>
            ))
          ) : (
            <p>No loan applications found.</p>
          )}
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