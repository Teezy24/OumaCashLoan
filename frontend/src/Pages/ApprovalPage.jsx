// Loan Application Approval Workflow (React Component)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApprovalWorkflow = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [approvalLevel, setApprovalLevel] = useState('Administrator'); // Initial level

  useEffect(() => {
    // Fetch loan applications
    axios.get('/api/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const handleSelectApplication = (id) => {
    const app = applications.find(a => a.id === id);
    setSelectedApplication(app);
    setApprovalLevel('Administrator'); // Reset to first level
  };

  const handleApprove = () => {
    if (approvalLevel === 'Administrator') {
      setApprovalLevel('Approver');
    } else if (approvalLevel === 'Approver') {
      setApprovalLevel('Authorized Payment Officer');
    } else if (approvalLevel === 'Authorized Payment Officer') {
      alert('Loan application approved and funds disbursed.');
      setSelectedApplication(null);
    }
  };

  const handleReject = () => {
    alert('Loan application rejected.');
    setSelectedApplication(null);
  };

  return (
    <div className="approval-workflow">
      <header>
        <h1>Loan Approval Workflow</h1>
      </header>

      <section className="applications-list">
        <h2>Pending Applications</h2>
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Client Name</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.clientName}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{app.status}</td>
                <td>
                  <button onClick={() => handleSelectApplication(app.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedApplication && (
        <section className="application-details">
          <h2>Application Details</h2>
          <p><strong>Application ID:</strong> {selectedApplication.id}</p>
          <p><strong>Client Name:</strong> {selectedApplication.clientName}</p>
          <p><strong>Net Salary:</strong> {selectedApplication.netSalary}</p>
          <p><strong>Loan Amount:</strong> {selectedApplication.loanAmount}</p>
          <p><strong>Status:</strong> {approvalLevel}</p>

          <div className="actions">
            <button onClick={handleApprove}>
              {approvalLevel === 'Authorized Payment Officer' ? 'Approve and Disburse' : 'Approve and Forward'}
            </button>
            <button onClick={handleReject}>Reject</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ApprovalWorkflow;