import React, { useState } from 'react';
import { Bell, HelpCircle, Search, ArrowLeft, Camera, Filter } from "lucide-react";
import './clientStyling/clientLoanApplication.css';

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedLoanType, setSelectedLoanType] = useState('PERSONAL LOAN');
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'loanApplication'

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
        <div className="dashboard-card">
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

  const renderPaymentStep = () => (
    <div className="loan-content">
      <h1 className="loan-title">Make a Payment</h1>
      <p className="loan-subtitle">Please specify the loan payment details and options below.</p>
      
      <div className="progress-steps">
        <div className={`step-item active`}>
          <div className="step-number">1</div>
          <span>Payment Options</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step-item ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Review and Pay</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Confirmation Message</span>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Loan ID</label>
          <input type="text" placeholder="Enter Loan ID" className="form-input" />
        </div>
        <div className="form-group">
          <label>Payment Amount</label>
          <input type="text" placeholder="Enter Payment Amount" className="form-input" />
        </div>
      </div>

      <div className="payment-method-section">
        <label>Payment Method</label>
        <div className="payment-methods">
          <button 
            className={`payment-method-btn ${selectedPaymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setSelectedPaymentMethod('card')}
          >
            <div className="payment-icon">💳</div>
            <span>Credit Card</span>
          </button>
          <button 
            className={`payment-method-btn ${selectedPaymentMethod === 'bank' ? 'active' : ''}`}
            onClick={() => setSelectedPaymentMethod('bank')}
          >
            <div className="payment-icon">🏦</div>
            <span>Bank Transfer</span>
          </button>
        </div>
      </div>

      <div className="payment-details-grid">
        <div className="payment-detail-box"></div>
        <div className="payment-detail-box"></div>
      </div>

      <div className="security-note">
        <span className="lock-icon">🔒</span>
        Your transaction is secured with SSL encryption
      </div>

      <div className="action-buttons">
        <button className="help-button">
          <HelpCircle size={20} />
        </button>
        <div className="navigation-buttons">
          <button className="prev-button" onClick={() => setView('dashboard')}>Cancel</button>
          <button className="next-button" onClick={() => setCurrentStep(2)}>
            Next <ArrowLeft size={16} className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="loan-content">
      <h1 className="loan-title">Apply for a loan</h1>
      <p className="loan-subtitle">Please upload your three months bank statement, latest pay slip and a certified copy of your ID.</p>
      
      <div className="progress-steps">
        <div className="step-item completed">
          <div className="step-number">1</div>
          <span>Personal Details</span>
        </div>
        <div className="step-connector"></div>
        <div className="step-item active">
          <div className="step-number">2</div>
          <span>Documents</span>
        </div>
        <div className="step-connector"></div>
        <div className="step-item">
          <div className="step-number">3</div>
          <span>Loan Details</span>
        </div>
      </div>

      <div className="upload-section">
        <div className="upload-box">
          <div className="upload-icon">📄</div>
          <p>Drag and Drop files here or Choose File</p>
          <span className="upload-info">Supported formats: PDF, PNG, JPG, DOCX, XLSX</span>
          <span className="upload-size">Minimum Size: 25MB</span>
        </div>

        <div className="uploaded-files">
          <div className="file-item">
            <div className="file-icon">📄</div>
            <div className="file-info">
              <span className="file-name">bank_statement.pdf</span>
              <span className="file-size">2 MB</span>
            </div>
          </div>
          <div className="file-item">
            <div className="file-icon">📄</div>
            <div className="file-info">
              <span className="file-name">pay_slip.pdf</span>
              <span className="file-size">1 MB</span>
            </div>
          </div>
          <div className="file-item">
            <div className="file-icon">📄</div>
            <div className="file-info">
              <span className="file-name">certified_id.pdf</span>
              <span className="file-size">3 MB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="help-button">
          <HelpCircle size={20} />
        </button>
        <div className="navigation-buttons">
          <button className="prev-button" onClick={() => setCurrentStep(1)}>Previous</button>
          <button className="next-button" onClick={() => setCurrentStep(3)}>
            Next <ArrowLeft size={16} className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderLoanDetailsStep = () => (
    <div className="loan-content">
      <h1 className="loan-title">Apply for a loan</h1>
      <p className="loan-subtitle">Please specify the loan terms and conditions below.</p>
      
      <div className="progress-steps">
        <div className="step-item completed">
          <div className="step-number">1</div>
          <span>Personal Details</span>
        </div>
        <div className="step-connector"></div>
        <div className="step-item completed">
          <div className="step-number">2</div>
          <span>Documents</span>
        </div>
        <div className="step-connector"></div>
        <div className="step-item active">
          <div className="step-number">3</div>
          <span>Loan Details</span>
        </div>
      </div>

      <div className="loan-type-buttons">
        {['PERSONAL LOAN', 'BUSINESS LOAN', 'HOUSING LOAN', 'AUTO LOAN'].map((type) => (
          <button
            key={type}
            className={`loan-type-btn ${selectedLoanType === type ? 'active' : ''}`}
            onClick={() => setSelectedLoanType(type)}
          >
            {type === 'PERSONAL LOAN' && '👤'}
            {type === 'BUSINESS LOAN' && '💼'}
            {type === 'HOUSING LOAN' && '🏠'}
            {type === 'AUTO LOAN' && '🚗'}
            {type}
          </button>
        ))}
      </div>

      <div className="loan-form-grid">
        <div className="form-group">
          <label>Net Salary</label>
          <input type="text" placeholder="Enter Text" className="form-input" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" placeholder="Enter Text" className="form-input" />
        </div>
        <div className="form-group">
          <label>Loan Amount</label>
          <input type="text" placeholder="Enter Text" className="form-input" />
        </div>
        <div className="loan-summary">
          <h3>You Will Pay</h3>
          <div className="amount">$5500</div>
          <div className="period">Per Month</div>
          <div className="interest">At a interest rate of</div>
          <div className="rate">10%</div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full-width">
          <label>Period</label>
          <select className="form-input">
            <option>36 months</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full-width">
          <label>Preferred method of transfer</label>
          <select className="form-input">
            <option>Bank Transfer</option>
          </select>
        </div>
      </div>

      <div className="action-buttons">
        <button className="help-button">
          <HelpCircle size={20} />
        </button>
        <div className="final-buttons">
          <button className="cancel-button" onClick={() => setView('dashboard')}>CANCEL</button>
          <button className="apply-button" onClick={() => {
            alert("Loan application submitted successfully!");
            setView('dashboard');
            setCurrentStep(1);
          }}>APPLY</button>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return renderPaymentStep();
      case 2:
        return renderDocumentsStep();
      case 3:
        return renderLoanDetailsStep();
      default:
        return renderPaymentStep();
    }
  };

  return (
    <div className="loan-application">
      <div className="loan-main">
        {view === 'dashboard' ? renderDashboard() : renderCurrentStep()}
      </div>
    </div>
  );
};

export default LoanApplication;