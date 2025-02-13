import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Components/clientSidebar";
import "../css/ApplyforLoan.css";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { useDropzone } from "react-dropzone";


import { LuFileUp } from "react-icons/lu";
import { IoMdWallet } from "react-icons/io";
import { PiToolboxFill } from "react-icons/pi";
import { FaHouseChimney } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt } from 'react-icons/fa';


axios.defaults.baseURL = "http://localhost:3002";
axios.defaults.withCredentials = true;

const ApplyforLoan = () => {
  const [formData, setFormData] = useState({
    netSalary: "",
    loanAmount: "",
    transferMethod: "E-Wallet",
    period: "",
    description: "",
    bankStatement: null,
    payslip: null,
    idCopy: null,
  });

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const fullname = localStorage.getItem('fullname'); // Ensure the full name is saved during login
    if (!fullname) {
      alert('User not logged in.');
      return;
    }
    setUserName(fullname);

    axios.get(`http://localhost:3002/user?fullname=${fullname}`)
      .then((response) => {
        setUserId(response.data.id)
      })
      .catch((error) => {
        console.error('Failed to fetch user ID:', error);
        alert('An error occurred while fetching user details.');
      })
  }, []);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = 
    name === 'netSalary' || name === 'loanAmount' || name === 'period'
      ? Number(value)
      : value;
  
  setFormData({ ...formData, [name]: updatedValue });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const validateLoanAmount = () => {
    const maxLoanAmount = formData.netSalary * 0.7;
    if (parseFloat(formData.loanAmount) > maxLoanAmount) {
      setError(
        `Loan amount cannot exceed 70% of your net salary: ${maxLoanAmount.toFixed(
          2
        )}`
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLoanAmount()) return;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("netSalary", formData.netSalary);
    formDataToSubmit.append("loanAmount", formData.loanAmount);
    formDataToSubmit.append("transferMethod", formData.transferMethod);
    formDataToSubmit.append("period", formData.period);
    formDataToSubmit.append("description", formData.description)
    formDataToSubmit.append("bankStatement", formData.bankStatement);
    formDataToSubmit.append("payslip", formData.payslip);
    formDataToSubmit.append("idCopy", formData.idCopy);

    try {
      const response = await axios.post(
        "http://localhost:3002/loan-application",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "user-id": userId,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Loan application submitted successfully!");
        setFormData({
          netSalary: "",
          loanAmount: "",
          transferMethod: "E-Wallet",
          period: "",
          description: "",
          bankStatement: null,
          payslip: null,
          idCopy: null,
        });
      }
    } catch (error) {
      setError("Failed to submit loan application. Please try again later.");
    }
  };

  const [action, setAction] = useState('');

  const personalLink = () => {
    setAction('');
  }

  const DocumentLink = () => {
    setAction(' active1');
  }
  const LoanDetailsLink = () => {
    setAction(' active2')
  }


  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      // Map specific files to corresponding fields in formData
      if (file.name.toLowerCase().includes("bank")) {
        setFormData((prev) => ({ ...prev, bankStatement: file }));
      } else if (file.name.toLowerCase().includes("payslip")) {
        setFormData((prev) => ({ ...prev, payslip: file }));
      } else if (file.name.toLowerCase().includes("id")) {
        setFormData((prev) => ({ ...prev, idCopy: file }));
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });


  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    // Call the corresponding function based on the button clicked
    switch (buttonName) {
      case 'personalDetails':
        personalLink();
        break;
      case 'documents':
        DocumentLink();
        break;
      case 'loanDetails':
        LoanDetailsLink();
        break;
      default:
        break;
    }
  };
  const isSelected = (buttonName) => selectedButton === buttonName;

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FaFilePdf className="file-icon" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="file-icon" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="file-icon" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="file-icon" />;
      default:
        return <FaFileAlt className="file-icon" />;
    }
  };


  return (
    <div>
      <Sidebar />
      <div className="ApplyLoan-container">
        <div className='form-container'>
          <div className="form-header">
            <h1>Apply for a Loan</h1>
            <p>Please verify that your personal credentials are correct, if not rectify them.</p>
            {/* <img src={logo} alt="this is the logo" className="Logo" />
          <h1>Oma Cash Loan Application Form</h1>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>} */}
          </div>
          <div className="ApplyLoan-button-container">

            <button className={`personalDetails-button ${isSelected('personalDetails') ? 'selected' : ''}`} onClick={() => handleButtonClick('personalDetails')}>Personal Details</button>


            <button className={`Document-button ${isSelected('documents') ? 'selected' : ''}`} onClick={() => handleButtonClick('documents')}>Documents</button>


            <button className={`loanDetail-button ${isSelected('loanDetails') ? 'selected' : ''}`} onClick={() => handleButtonClick('loanDetails')}>Loan Details</button>
          </div>
          <div className={`wrapper1${action}`}>
            <form className="form-personalDetails" onSubmit={handleSubmit}>

              <div className="Fullname-PhoneNo-input">
                <div className='Fullname-input'>
                  <label htmlFor="fullname">Fullname</label>
                  <input type="text" name="fullname" id="Fullname" placeholder="Fullname" />
                </div>
                <div className='PhoneNo-input'>
                  <label htmlFor="PhoneNo">Phone</label>
                  <input type="number" name="fullname" id="Fullname" placeholder="Phone Number" />
                </div>
              </div>

              <div className="Email-Postal-input">
                <div className='Email-input'>
                  <label htmlFor="fullname">Email</label>
                  <input type="text" name="fullname" id="Fullname" placeholder="Fullname" />
                </div>
                <div className='Postal-input'>
                  <label htmlFor="PhoneNo">Postal Address</label>
                  <input type="number" name="fullname" id="Fullname" placeholder="Phone Number" />
                </div>
              </div>

              <div className="IDNo-Residential-input">
                <div className='IDNo-input'>
                  <label htmlFor="fullname">National Identification Number</label>
                  <input type="text" name="fullname" id="Fullname" placeholder="Fullname" />
                </div>
                <div className='Residential-input'>
                  <label htmlFor="PhoneNo">Postal Address</label>
                  <input type="number" name="fullname" id="Fullname" placeholder="Phone Number" />
                </div>
              </div>

              <div className='ApplyLoan-submit-container'>
                <button className='confirmDetails-button'>Confirm Details</button>
                <button className='RectifyDetails-button'>Rectify Details</button>
              </div>

            </form>

            <form className="form-Documents-LoanDetails" onSubmit={handleSubmit}>
              <div className='form-Documents'>
                <div className="drag-and-drop-section">
                  <h3>Upload File</h3>
                  <div
                    {...getRootProps({
                      className: `dropzone ${isDragActive ? "active-dropzone" : ""}`,
                    })}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p><LuFileUp className="Upload-icon" />Drop the files here...</p>
                    ) : (
                      <p><LuFileUp className="Upload-icon" />Drag and drop your files here, or click to select files</p>
                    )}
                  </div>
                  <div className='Supported-files'>
                    <p>Supported formats: PDF, PNG, JPG, DOCX, XLSX</p>
                  </div>

                  <ul>
                    {/* Display uploaded files */}
                    {formData.bankStatement && (
                      <li>
                        {getFileIcon(formData.bankStatement.name)}
                         Bank Statement: {formData.bankStatement.name}
                      </li>
                    )}
                    {formData.payslip && <li>{getFileIcon(formData.payslip.name)}
                      Payslip: {formData.payslip.name}
                      </li>}
                    {formData.idCopy && <li> {getFileIcon(formData.idCopy.name)}
                      ID Copy: {formData.idCopy.name}</li>}
                  </ul>
                </div>
              </div>
              <div className="form-LoanDetails">
                <div className='loanType-Selection'>
                  <p>Loan type</p>
                  <div className='LoanType-button-container'>
                    <button ><IoMdWallet className="general-icon" />Personal Loan</button>
                    <button ><PiToolboxFill className="general-icon" />Bussness Loan</button>
                    <button ><FaHouseChimney className="general-icon" />Housing Loan</button>
                    <button ><FaCar className="general-icon" />Auto Loan</button>
                  </div>
                  <div className='Twoform-container'>
                    <div className='firstform-conainer'>
                      <div>
                        <label htmlFor="netSalary">Net Salary</label>
                        <input type="number" name = "netSalary" placeholder="Enter net salary" value = {formData.netSalary} onChange={handleInputChange} />
                      </div>
                      <div>
                        <label htmlFor="loanAmount">Loan Amount</label>
                        <input type="number" name = "loanAmount" placeholder="Enter Loan Amount" value={formData.loanAmount} onChange={handleInputChange}/>
                      </div>
                      <div>
                        <label htmlFor="Period">Period</label>
                        <input type="number" name = "period" placeholder="Enter Period"  value={formData.period} onChange={handleInputChange}/>
                      </div>
                      <div>
                        <label htmlFor="TransferMethod">Preferred method of Transfer</label>
                        <select className = 'dropDown' name="transferMethod" value={formData.transferMethod} onChange={handleInputChange}>
                        <option value="E-Wallet">E-Wallet</option>
                        <option value="Easy-Wallet">Easy-Wallet</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>
                    </div>
                    <div className='secondform-conainer'>
                      <div>
                        <label htmlFor="Description">Description</label>
                        <input type="text"  name="description" placeholder="Enter description" value={formData.description} onChange={handleInputChange}/>
                      </div>
                      <div className='calculator-box'>
                        <p>You will pay</p>
                        <span>$5500</span>
                        <p>Per Month</p>
                        <p>At an interest rate of </p>
                        <span>10%</span>
                      </div>

                      <div className='final-submit-button-container'>
                        <button>CANCEL</button>
                        <button type = 'submit' className="form-apply-button">Apply</button>
                        {error && <p className="error-message">{error}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyforLoan;
