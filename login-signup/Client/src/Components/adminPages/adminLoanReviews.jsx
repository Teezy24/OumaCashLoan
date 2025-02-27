import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import "./adminStyling/adminLoanReviews.css";
import { FaSearch, FaCheckCircle, FaClock, FaTimesCircle, FaTrash, FaSyncAlt } from "react-icons/fa";

const AdminLoanReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loans, setLoans] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/loanApplications');
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

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
        await axios.delete(`http://localhost:3000/api/loanApplications/${selectedLoan.id}`);
        setLoans(loans.filter(loan => loan.id !== selectedLoan.id));
        closeModal();
      } catch (error) {
        console.error('Error deleting loan application:', error);
      }
    }
  };

  const filteredLoans = loans.filter(loan =>
    (loan.full_name && loan.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (loan.id && loan.id.toString().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="loan-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name or email address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="search-icon" />
      </div>
      <div className="refresh-button-container">
        <button className="refresh-button" onClick={fetchLoans}>
          <FaSyncAlt /> Refresh
        </button>
      </div>
      <div className="loan-table-container">
        <table className="loan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Postal Address</th>
              <th>National ID</th>
              <th>Net Salary</th>
              <th>Loan Amount</th>
              <th>Period</th>
              <th>Transfer Method</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.full_name}</td>
                <td>{loan.phone_number}</td>
                <td>{loan.email}</td>
                <td>{loan.postal_address}</td>
                <td>{loan.national_id}</td>
                <td>{loan.net_salary}</td>
                <td>{loan.loan_amount}</td>
                <td>{loan.period} months</td>
                <td>{loan.transfer_method}</td>
                <td>{loan.description}</td>
                <td className={`loan-status ${loan.status?.toLowerCase()}`}>
                  {loan.status === "Approved" && <FaCheckCircle />}
                  {loan.status === "Pending" && <FaClock />}
                  {loan.status === "Rejected" && <FaTimesCircle />}
                  {loan.status}
                </td>
                <td>
                  <button className="delete-button" onClick={() => openModal(loan)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Delete</h2>
        {selectedLoan && (
          <p>Are you sure you want to delete '{selectedLoan.id} - {selectedLoan.full_name}'s Loan Application?</p>
        )}
        <div className="modal-buttons">
          <button onClick={handleDelete} className="confirm-button">Yes, Delete</button>
          <button onClick={closeModal} className="cancel-button">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminLoanReview;