import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import '../sidebar.css';
import "./clientStyling/clientLoanApplication.css";


const ClientLoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="loan-application-container">
      <div className="form-container">
        <h1 className="form-title">Apply for a Loan</h1>
        <p className="form-subtitle">
          {currentStep === 1 && "Please verify that your personal credentials are correct, if not rectify them."}
          {currentStep === 2 && "Please upload your three months bank statement, latest pay slip, and a certified copy of your ID."}
          {currentStep === 3 && "Please specify the loan terms and conditions below."}
        </p>
        <div className="form-content">
          {currentStep === 1 && (
            <div className="step">
              <h2>Personal Details</h2>
              <div className="form-row">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
              </div>
              <div className="form-row">
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Phone Number" />
              </div>
              <div className="form-row">
                <input type="text" placeholder="National ID Number" />
                <input type="text" placeholder="Postal Address" />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Residential Address" />
              </div>
              <button className="next-btn" onClick={nextStep}>
                Next
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <div className="step">
              <h2>Documents</h2>
              <div className="upload-area">
                <p>Drag and Drop file here or <span>Choose File</span></p>
                <p className="upload-support">Supported formats: PDF, PNG, JPG, DOCX, XLSX</p>
              </div>
              <button className="prev-btn" onClick={prevStep}>
                Previous
              </button>
              <button className="next-btn" onClick={nextStep}>
                Next
              </button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="step">
              <h2>Loan Details</h2>
              <div className="form-row">
                <select>
                  <option value="">Loan Type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="housing">Housing Loan</option>
                </select>
                <input type="text" placeholder="Net Salary" />
              </div>
              <div className="form-row">
                <input type="text" placeholder="Loan Amount" />
                <input type="text" placeholder="Description" />
              </div>
              <div className="form-row">
                <select>
                  <option value="">Preferred method of transfer</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              <button className="prev-btn" onClick={prevStep}>
                Previous
              </button>
              <button className="apply-btn">Apply</button>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ClientLoanApplication;