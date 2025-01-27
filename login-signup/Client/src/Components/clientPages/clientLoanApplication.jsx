import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import '../sidebar.css';
import "./clientStyling/clientLoanApplication.css";


const ClientLoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="main-container">
      <div className="application-container">
        <h1 className="application-title">Apply for a loan</h1>
        <p className="application-subtitle">
          Please verify that your personal credentials are correct, if not rectify them.
        </p>

        <div className="steps-indicator-container">
          <div className={`step ${currentStep === 1 ? "active-step" : ""}`}>Personal Details</div>
          <div className={`step ${currentStep === 2 ? "active-step" : ""}`}>Documents</div>
          <div className={`step ${currentStep === 3 ? "active-step" : ""}`}>Loan Details</div>
        </div>

        <div className="content-container">
          {currentStep === 1 && (
            <div className="step-content">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Enter Last Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter Email" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter Phone Number" />
              </div>
              <div className="form-group">
                <label>National Identification Number</label>
                <input type="text" placeholder="Enter ID Number" />
              </div>
              <div className="form-group">
                <label>Postal Address</label>
                <input type="text" placeholder="Enter Postal Address" />
              </div>
              <div className="form-group">
                <label>Residential Address</label>
                <input type="text" placeholder="Enter Residential Address" />
              </div>
              <div className="button-group">
                <button className="action-button confirm-button">Confirm Details</button>
                <button className="action-button rectify-button">Rectify Details</button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-content">
              <p className="upload-instructions">
                Please upload your three months bank statement, latest pay slip and a certified copy of your ID.
              </p>
              <div className="upload-container">
                <div className="file-drop-area">
                  <p>Drag and Drop file here or <span className="choose-file">Choose File</span></p>
                </div>
                <div className="uploaded-files">
                  <div className="uploaded-file">Bank Statement.pdf</div>
                  <div className="uploaded-file">Pay Slip.pdf</div>
                  <div className="uploaded-file">Certified ID Copy.pdf</div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
              <div className="form-group">
                <label>Loan Type</label>
                <div className="loan-type-options">
                  <button className="loan-type-button">Personal Loan</button>
                  <button className="loan-type-button">Business Loan</button>
                  <button className="loan-type-button">Housing Loan</button>
                  <button className="loan-type-button">Auto Loan</button>
                </div>
              </div>
              <div className="form-group">
                <label>Net Salary</label>
                <input type="text" placeholder="Enter Net Salary" />
              </div>
              <div className="form-group">
                <label>Loan Amount</label>
                <input type="text" placeholder="Enter Loan Amount" />
              </div>
              <div className="form-group">
                <label>Period</label>
                <select>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>18 months</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Method of Transfer</label>
                <select>
                  <option>Bank Transfer</option>
                  <option>Mobile Money</option>
                  <option>Cash Pickup</option>
                </select>
              </div>
              <div className="loan-summary">
                <p>You will pay <strong>$5500</strong> per month</p>
                <p>At an interest rate of <strong>10%</strong></p>
              </div>
              <div className="button-group">
                <button className="action-button cancel-button">Cancel</button>
                <button className="action-button apply-button">Apply</button>
              </div>
            </div>
          )}
        </div>

        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button className="action-button previous-button" onClick={handlePrevious}>Previous</button>
          )}
          {currentStep < 3 && (
            <button className="action-button next-button" onClick={handleNext}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientLoanApplication;
