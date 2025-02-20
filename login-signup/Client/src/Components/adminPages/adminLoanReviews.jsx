import { useState } from "react";
import "./adminStyling/adminLoanReviews.css"
import {FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaSearch, FaEllipsisV } from "react-icons/fa";
import { FaCar, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";


const AdminLoanReview = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [loans] = useState([
      { id: "#0149", name: "Cruz Home Loan", amount: "$300,000", term: "20 months", interest: "9 percent", type: "Housing Loan", status: "Approved", applied: "applied 300 days ago" },
      { id: "#79998", name: "Horizon Auto Loan", amount: "$10,000", term: "16 months", interest: "7 percent", type: "Auto Loan", status: "Pending", applied: "applied 44 days ago" },
      { id: "#79944", name: "Horizon Auto Loan", amount: "$15,000", term: "16 months", interest: "10 percent", type: "Personal Loan", status: "Rejected", applied: "applied 100 days ago" },
    ]);
  
    const filteredLoans = loans.filter(loan =>
      loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="wrapper">
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
          <FaMoneyCheckDollar size={20}/>
          </button>
        </div>
        <div className="filter-box">
          <span>Filter</span>
          <button className="filter-button">
          <IoFilter size={20}/>
          </button>
        </div>
      </div>

      <div className="loan-list-container">
        {filteredLoans.map((loan) => (
          <div className="loan-item" key={loan.id}>
            <div className="loan-details">
              {/* Loan Name & Status */}
              <div className="loan-number">
                {loan.id} - {loan.name}
                <span className={`loan-status ${loan.status.toLowerCase()}`}>
                  {loan.status === "Approved" && <FaCheckCircle />}
                  {loan.status === "Pending" && <FaClock />}
                  {loan.status === "Rejected" && <FaTimesCircle />}
                  {loan.status}
                </span>
              </div>

              <div className="loan-info">
                <span className="loan-amount">{loan.amount}</span>
                <span>•</span>
                <span className="loan-term">{loan.term}</span>
                <span>•</span>
                <span className="loan-rate">{loan.interest} interest</span>
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
         </div>
          
  )
}

export default AdminLoanReview;