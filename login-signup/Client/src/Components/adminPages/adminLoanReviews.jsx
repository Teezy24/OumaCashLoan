import { useState, useEffect } from "react";
import axios from 'axios';
import "./adminStyling/adminLoanReviews.css";
import { FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog, FaSearch, FaEllipsisV } from "react-icons/fa";
import { FaCar, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const AdminLoanReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/loanApplications');
        setLoans(response.data);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };

    fetchLoans();
  }, []);

  const filteredLoans = loans.filter(loan =>
    (loan.fullname && loan.fullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (loan.id && loan.id.toString().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="loan-container-1">
      <div className="spacing">
        <div className="search-box-4">
          <input
            type="text"
            placeholder="Search by name or email address"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="loan-page-container">
          <div className="search-and-filter">
            <div className="filter-box">
              <span>Loans</span>
              <button className="filter-button">
                <FaMoneyCheckDollar size={20} />
              </button>
            </div>
            <div className="filter-box">
              <span>Filter</span>
              <button className="filter-button">
                <IoFilter size={20} />
              </button>
            </div>
          </div>

          <div className="loan-list-container">
            {filteredLoans.map((loan) => (
              <div className="loan-item" key={loan.id}>
                <div className="loan-details">
                  {/* Loan Name & Status */}
                  <div className="loan-number">
                    {loan.id} - {loan.fullname}
                    <span className={`loan-status ${loan.status?.toLowerCase()}`}>
                      {loan.status === "Approved" && <FaCheckCircle />}
                      {loan.status === "Pending" && <FaClock />}
                      {loan.status === "Rejected" && <FaTimesCircle />}
                      {loan.status}
                    </span>
                  </div>

                  <div className="loan-info">
                    <span className="loan-amount">${loan.loan_amount}</span>
                    <span>•</span>
                    <span className="loan-term">{loan.period} months</span>
                    <span>•</span>
                    <span className="loan-rate">{loan.interest}% interest</span>
                  </div>

                  <div className="loan-type">
                    {loan.type === "Auto Loan" && <FaCar />}
                    {loan.type === "Housing Loan" && <FaHome />}
                    <span>{loan.type}</span>
                    <span>•</span>
                    <span className="loan-applied">{loan.applied}</span>
                  </div>
                </div>

                <div className="loan-menu">
                  <FaEllipsisV />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoanReview;