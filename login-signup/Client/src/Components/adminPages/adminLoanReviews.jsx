import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import "./adminStyling/adminLoanReviews.css";
import { FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaTrash, FaEnvelope, FaEllipsisV, FaFileAlt } from "react-icons/fa";
import { Chart, Filler } from 'chart.js';
import { Bell, HelpCircle, Search, ArrowLeft, Camera } from "lucide-react";

// Register the 'Filler' plugin
Chart.register(Filler);

const AdminLoanReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loans, setLoans] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchLoans = async () => {
    try {
      const response = await axios.get('/api/loanApplications');
      const loansWithDocuments = await Promise.all(response.data.map(async (loan) => {
        const documents = await fetchDocuments(loan.id);
        return { ...loan, documents };
      }));
      setLoans(loansWithDocuments);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchDocuments = async (loanId) => {
    try {
      const response = await axios.get(`/api/loanApplications/${loanId}/documents`);
      return response.data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  };

  const openModal = (loan) => {
    setSelectedLoan(loan);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLoan(null);
  };

  const handleDelete = async () => {
    if (selectedLoan) {
      try {
        await axios.delete(`/api/loanApplications/${selectedLoan.id}`);
        setLoans(loans.filter(loan => loan.id !== selectedLoan.id));
        closeModal();
      } catch (error) {
        console.error('Error deleting loan application:', error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`/api/loanApplications/${id}/status`, { status });
      setLoans(loans.map(loan => loan.id === id ? { ...loan, status } : loan));
    } catch (error) {
      console.error('Error updating loan application status:', error);
    }
  };

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const toggleFilter = () => {
    setFilterActive(!filterActive);
  };

  const filteredLoans = loans
    .filter(loan => 
      (loan.full_name && loan.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (loan.id && loan.id.toString().includes(searchTerm.toLowerCase()))
    )
    .filter(loan => filterStatus === "All" || loan.status === filterStatus)
    .sort((a, b) => {
      if (a.status === "Pending" && (b.status === "Approved" || b.status === "Rejected")) return -1;
      if ((a.status === "Approved" || a.status === "Rejected") && b.status === "Pending") return 1;
      return 0;
    });

  return (
    <div className="ar-main-container">
      <div className="ar-loan-container" style={{ height: '500px', overflow: 'auto' }}>
        <div className="ar-search-wrapper">
            <div className="ar-search-box">
              <input
                type="text"
                placeholder="Search by name or email address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="ar-search-button">
                <FaSearch />
              </button>
            </div>
          </div>
       
          <div className="ar-loans-header">
            <h2>Loans</h2>
            <div className="ar-header-actions">
              <button className="ar-filter-button" onClick={toggleFilter}>
                <span>Filter</span>
              </button>
              {filterActive && (
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="ar-filter-select"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              )}
            </div>
          </div>

          <div className="ar-loan-cards-container">
            {filteredLoans.map((loan) => (
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
                      <FaClock className="ar-icon-circle" />
                    </div>
                    <div className="ar-detail-info">
                      <span>National ID: {loan.national_id}</span>
                    </div>
                    <div className="ar-detail-info-right">      
                      <span className="ar-label">Attached Document:</span>
                      {loan.documents && loan.documents.map((doc, index) => (
                        <button key={index} className="doc-file" onClick={() => window.open(`http://localhost:5000/uploads/${doc.filename}`, '_blank')}>
                          <FaFileAlt /> {doc.filename}
                        </button>
                      ))}
                    </div>
                  </div>

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
                  </div>
                </div>
                
                <div className="ar-loan-card-actions">
                  <button 
                    className="ar-approve-button" 
                    onClick={() => handleStatusChange(loan.id, 'Approved')}
                    disabled={loan.status === 'Approved'}
                  >
                    <FaCheckCircle /> Approve
                  </button>
                  <button 
                    className="ar-reject-button" 
                    onClick={() => handleStatusChange(loan.id, 'Rejected')}
                    disabled={loan.status === 'Rejected'}
                  >
                    <FaTimesCircle /> Reject
                  </button>
                  <button 
                    className="ar-email-button" 
                    onClick={() => handleSendEmail(loan.email)}
                  >
                    <FaEnvelope /> Email
                  </button>
                  <button 
                    className="ar-delete-button" 
                    onClick={() => openModal(loan)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="ar-modal"
        overlayClassName="ar-overlay"
      >
        <h2>Confirm Delete</h2>
        {selectedLoan && (
          <p>Are you sure you want to delete '{selectedLoan.id} - {selectedLoan.full_name}'s Loan Application?</p>
        )}
        <div className="ar-modal-buttons">
          <button onClick={handleDelete} className="ar-confirm-button">Yes, Delete</button>
          <button onClick={closeModal} className="ar-cancel-button">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminLoanReview;