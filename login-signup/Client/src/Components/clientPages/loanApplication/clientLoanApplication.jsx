import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; // 
import { FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaTrash, FaEnvelope, FaEllipsisV } from "react-icons/fa";
import ClientLoanForm from './clientLoanForm';
import '../clientStyling/clientLoanApplication.css';
import api from '../../../axiosConfig'; // Import the configured Axios instance
import { UserContext } from '../../../UserContext'; // Import the UserContext

const LoanApplication = () => {
  const { user, setUser } = useContext(UserContext); // Use the UserContext
  const [searchTerm, setSearchTerm] = useState("");
  const [loanApplications, setLoanApplications] = useState([]);
  const [view, setView] = useState('dashboard');
  const navigate = useNavigate(); // 

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await api.get('/auth/session');
        console.log('Session Data:', response.data);
        setUser(response.data); // Update state with session data
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null); // No session found
        if (error.response && error.response.status === 401) {
          navigate.push('/'); // Redirect  page if unauthorized
        }
      }
    };
  
    fetchSession();
  }, [setUser, navigate]);

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await api.get('/user/loanApplications');
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
  }, [user]);

  const filteredLoans = loanApplications
    .filter(loan => 
      (loan.full_name && loan.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (loan.id && loan.id.toString().includes(searchTerm.toLowerCase()))
    );

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
          <input
            type="text"
            placeholder="Search by name or email address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="loans-section">
        <div className="loans-header">
          <div className="loans-title">
            <span className="loans-icon">📄</span>
            <h3>Loans</h3>
          </div>
        </div>
        
        <div className="ar-loan-cards-container">
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan) => (
              <div key={loan.id} className="ar-loan-card">
                <div className="ar-loan-card-header">
                  <div className="ar-loan-info">
                    <div className="ar-loan-id">#{loan.id} - {loan.full_name}</div>
                    <div className={`ar-loan-badge ${loan.status?.toLowerCase()}`}>
                      {loan.status || 'Pending'}
                    </div>
                  </div>
                  <div className="ar-loan-actions">
                    <button className="ar-menu-button">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
                
                <div className="ar-loan-card-body">
                  <div className="ar-loan-detail-row">
                    <div className="ar-detail-icon">
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Phone Number: {loan.phone_number}</span>
                    </div>
                  </div>
                  
                  <div className="ar-loan-detail-row">
                    <div className="ar-detail-icon">
                      <FaClock className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Email: {loan.email}</span>
                    </div>
                  </div>
                  
                  <div className="ar-loan-detail-row">
                    <div className="ar-detail-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ar-icon-circle">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M12.5 7.5v5l3.5 3.5"/>
                      </svg>
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Postal Address: {loan.postal_address}</span>
                    </div>
                  </div>
                  
                  <div className="ar-loan-type-row">
                    <div className="ar-loan-type-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <span>National ID: {loan.national_id}</span>
                    <span className="ar-loan-update">Net Salary: {loan.net_salary}</span>
                    <span className="ar-loan-update">Loan Amount: {loan.loan_amount}</span>
                    <span className="ar-loan-update">Period: {loan.period} months</span>
                    <span className="ar-loan-update">Transfer Method: {loan.transfer_method}</span>
                    <span className="ar-loan-update">Description: {loan.description}</span>
                    {loan.documents && loan.documents.map((document, index) => (
                      <button key={index} onClick={() => window.open(`/uploads/${document.filename}`, '_blank')}>
                        View Document
                      </button>
                    ))}
                  </div>
                </div>
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