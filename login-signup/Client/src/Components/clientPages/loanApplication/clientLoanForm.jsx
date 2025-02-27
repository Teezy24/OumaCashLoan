import React, { useState } from 'react';
import axios from 'axios';
import { ArrowRight, HelpCircle } from "lucide-react";
import '../clientStyling/clientLoanApplication.css';

const ClientLoanForm = ({ setView }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phoneNumber: '',
    email: '',
    postalAddress: '',
    nationalId: '',
    netSalary: '',
    description: '',
    loanAmount: '',
    period: '36',
    transferMethod: 'Bank Transfer',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    setUploadedFiles(prevFiles => [...prevFiles, ...event.target.files]);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting form data:", formData); // Debugging output

      // Send as JSON instead of FormData
      const response = await axios.post(
        'http://localhost:3000/api/loanApplication',
        formData,
        {
          headers: {
            'Content-Type': 'application/json', // Ensure JSON format
          },
        }
      );

      alert('Loan application submitted successfully');
      setView('dashboard');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      alert('Error submitting loan application');
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <div className="loan-content">
          <h1 className="loan-title">Apply for a Loan</h1>
          <p className="loan-subtitle">Please fill in your personal details below.</p>
          
          <div className="progress-steps">
            <div className={`step-item active`}>
              <div className="step-number">1</div>
              <span>Personal Details</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-item ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span>Documents</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span>Loan Details</span>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>First Name & Surname</label>
              <input 
                type="text" 
                placeholder="Enter full_name" 
                className="form-input" 
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                placeholder="Example: +264 81" 
                className="form-input" 
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="form-input" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Postal Address</label>
              <input 
                type="text" 
                placeholder="Enter Postal Address" 
                className="form-input" 
                value={formData.postalAddress}
                onChange={(e) => setFormData({...formData, postalAddress: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>National Identification Number</label>
              <input 
                type="text" 
                placeholder="Enter National ID Number" 
                className="form-input" 
                value={formData.nationalId}
                onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
              />
            </div>
          </div>

          <div className="action-buttons">
            <button className="help-button">
              <HelpCircle size={20} />
            </button>
            <div className="navigation-buttons">
              <button className="prev-button" onClick={() => setView('dashboard')}>Cancel</button>
              <button className="next-button" onClick={() => setCurrentStep(2)}>
                Next <ArrowRight size={16} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className="loan-content">
          <h1 className="loan-title">Apply for a Loan</h1>
          <p className="loan-subtitle">Please upload your documents below.</p>
          
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

          <div className="upload-box">
            <input type="file" multiple onChange={handleFileChange} />
            <div className="upload-icon">📁</div>
            <p>Drag and drop your files here, or click to select files</p>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <h3>Uploaded Files</h3>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="action-buttons">
            <button className="help-button">
              <HelpCircle size={20} />
            </button>
            <div className="navigation-buttons">
              <button className="prev-button" onClick={() => setCurrentStep(1)}>Previous</button>
              <button 
                className="next-button" 
                onClick={() => setCurrentStep(3)}
                disabled={uploadedFiles.length === 0}
              >
                Next <ArrowRight size={16} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
      {currentStep === 3 && (
        <div className="loan-content">
          <h1 className="loan-title">Apply for a Loan</h1>
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

          <div className="loan-form-grid">
            <div className="form-group">
              <label>Net Salary</label>
              <input 
                type="text" 
                placeholder="Enter Net Salary" 
                className="form-input" 
                value={formData.netSalary}
                onChange={(e) => setFormData({...formData, netSalary: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Loan Amount</label>
              <input 
                type="text" 
                placeholder="Enter Loan Amount" 
                className="form-input" 
                value={formData.loanAmount}
                onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Loan Period</label>
              <select 
                className="form-input" 
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value})}
              >
                <option value="12">12 Months</option>
                <option value="24">24 Months</option>
                <option value="36">36 Months</option>
                <option value="48">48 Months</option>
                <option value="60">60 Months</option>
              </select>
            </div>

            <div className="form-group">
              <label>Payment Type</label>
              <select 
                className="form-input" 
                value={formData.transferMethod}
                onChange={(e) => setFormData({...formData, transferMethod: e.target.value})}
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            <div className="form-group">
              <label>Loan Description</label>
              <textarea 
                placeholder="Enter Loan Description" 
                className="form-input" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="action-buttons">
            <button className="help-button">
              <HelpCircle size={20} />
            </button>
            <div className="navigation-buttons">
              <button className="prev-button" onClick={() => setCurrentStep(2)}>Previous</button>
              <button className="next-button" onClick={handleSubmit}>
                Submit <ArrowRight size={16} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientLoanForm;