import { useState } from "react"
import React from 'react'
import "../adminStyling/adminLoanSettings.css"
import {  FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaLock,FaUser, FaCreditCard, FaFileInvoiceDollar} from "react-icons/fa";

const AdminLoanSettings = () => {

    const [loanType, setLoanType] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [eligibilityPercentage, setEligibilityPercentage] = useState(70);
    const [afterEvery, setAfterEvery] = useState('');
  
    const handleLoanTypeChange = (event) => setLoanType(event.target.value);
    const handleInterestRateChange = (event) => setInterestRate(event.target.value);
    const handleEligibilityPercentageChange = (event) => setEligibilityPercentage(event.target.value);
    const handleAfterEveryChange = (event) => setAfterEvery(event.target.value);

    const interestRates = Array.from({ length: 100 }, (_, i) => i + 1);

  return (

        <div className="white-container large">
        <div className="loan-settings-content"> 
        <div className="loan-settings-section">
          <h3>Configure loan type</h3>
          <p>Configure the rates of interest for different loan types and modify repayment terms.</p>
          <div className="horizontally-placed">
          <div className="loan-settings-input-group">
            <select id="loanType" value={loanType} onChange={handleLoanTypeChange}>
              <option value="">Select Loan Type</option>
              <option >Business Loan </option>
              <option >Personal Loan </option>
            </select>
          </div>
          <div className="loan-settings-input-group">
          <select id="interestRate" value={interestRate} onChange={handleInterestRateChange} className="custom-selects">
    <option value="" disabled hidden>
      Select Interest Rate
    </option>
    {interestRates.map((rate) => (
      <option key={rate} value={rate}>
        {rate}%
      </option>
    ))}
  </select>
          </div>
          <button className="loan-settings-change-button-1">CHANGE</button>
          </div>
        </div>

        <div className="loan-settings-section">
          <h3>Configure eligibility</h3>
          <p>Set approval thresholds and eligibility criteria based on client net income.</p>
          <div className="horizontally-placed">
          <div className="loan-settings-input-group">
            <input type="number" id="eligibilityPercentage" value={eligibilityPercentage} onChange={handleEligibilityPercentageChange} />
          </div>
          <button className="loan-settings-change-button-1">CHANGE</button>
        </div>
        </div>

        <div className="loan-settings-section">
          <h3>Configure default penalties</h3>
          <p>Set penalties and terms for payments done past agreed time intervals.</p>
          <div className="horizontally-placed">
          <div className="loan-settings-input-group">
          <select id="interestRate" value={interestRate} onChange={handleInterestRateChange} className="custom-selects">
                <option value="" disabled hidden>
                Late Payment Rate
                </option>
                {interestRates.map((rate) => (
                <option key={rate} value={rate}>
                    {rate}%
                </option>
                ))}
            </select>
          </div>
          <div className="loan-settings-input-group">
            <select id="afterEvery" value={afterEvery} onChange={handleAfterEveryChange}>
              <option value="">Select Time Interval</option>
            </select>
          </div>
          <button className="loan-settings-change-button-1">CHANGE</button>
          </div>
        </div>

        <div className="loan-settings-section">
          <h3>Configure default penalties</h3>
          <p>Set penalties and terms for payments done past agreed time intervals.</p>
          <div className="horizontally-placed">
          <div className="loan-settings-input-group">
            <input type="number" id="eligibilityPercentage" value={eligibilityPercentage} onChange={handleEligibilityPercentageChange} />
          </div>
          <button className="loan-settings-change-button-1">CHANGE</button>
        </div>
          </div>
      </div>
     </div>
  )
}

export default AdminLoanSettings;