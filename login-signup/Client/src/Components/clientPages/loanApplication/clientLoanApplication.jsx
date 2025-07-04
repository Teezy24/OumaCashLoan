import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaTrash, FaEnvelope, FaEllipsisV } from "react-icons/fa";
import ClientLoanForm from './clientLoanForm';
import '../clientStyling/clientLoanApplication.css';
import api from '../../../axiosConfig';
import { UserContext } from '../../../UserContext';

const LoanApplication = () => {
  const { user, setUser } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [loanApplications, setLoanApplications] = useState([]);
  const [view, setView] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await api.get('/auth/session');
        console.log('Session Data:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
        if (error.response && error.response.status === 401) {
          navigate.push('/');
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
          setLoanApplications([]);
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

  const filteredLoans = loanApplications.filter(
    loan =>
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
                      <span className="ar-label">Phone: {loan.phone_number}</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaEnvelope className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Email: {loan.email}</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">ID: {loan.national_id}</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Salary: ${loan.net_salary}</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Amount: ${loan.loan_amount}</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Period: {loan.period} mo</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span className="ar-label">Method: {loan.transfer_method}</span>
                    </div>

                    <div className="ar-detail-icon" style={{ marginLeft: '12px' }}>
                      <FaCheckCircle className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      {loan.documents && (
                        <button onClick={() => window.open(`/uploads/${loan.documents[0]?.filename}`, '_blank')}>
                          View Doc
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Optional: description could be collapsible or shown on demand */}
                  {loan.description && (
                    <div className="ar-description" style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                      {loan.description.length > 60
                        ? `${loan.description.substring(0, 60)}...`
                        : loan.description}
                    </div>
                  )}
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