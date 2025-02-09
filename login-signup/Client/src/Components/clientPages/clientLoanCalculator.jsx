import React, { useState } from "react";
import { Doughnut } from 'recharts';
import "./clientStyling/clientLoanCalculator.css";
import '../sidebar.css';



function ClientLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateLoan = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const months = parseInt(loanTerm);
    const interest = 0.05; // 5% interest rate

    if (principal && months) {
      const monthlyInterest = interest / 12;
      const payment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -months));
      setMonthlyPayment(payment.toFixed(2));
    }
  };

  return (
    <div className="loan-calculator-container">
      <div className="calculator-card">
        <h1>Loan Calculator</h1>
        <p>The calculated amount of the loan is approximate. The exact amount is to be determined individually.</p>
        
        <div className="calculator-content">
          <div className="calculator-form">
            <form onSubmit={calculateLoan}>
              <div className="cc-input-group">
                <label>How much do you need?</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter Amount"
                />
              </div>
              
              <div className="input-group">
                <label>How many months do you need?</label>
                <select 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                >
                  <option value="">Select months</option>
                  {[3, 6, 9, 12, 18, 24].map(month => (
                    <option key={month} value={month}>{month} months</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="calculate-btn">
                CALCULATE
              </button>

              {monthlyPayment && (
                <div className="result">
                  <p>You Will Pay</p>
                  <h2>${monthlyPayment}</h2>
                  <p>Per Month</p>
                </div>
              )}
            </form>
          </div>

          <div className="cc-graph-section">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3>In Total</h3>
              <h2>$33,000</h2>
            </div>
            
            {/* Hardcoded graph for now */}
            <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <svg viewBox="0 0 200 200" width="200" height="200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#7c3aed" strokeWidth="30" strokeDasharray="377 502" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#60a5fa" strokeWidth="30" strokeDasharray="126 502" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#818cf8" strokeWidth="30" strokeDasharray="25 502" />
              </svg>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <div>
                <span style={{ color: '#7c3aed' }}>●</span> Principal
                <p>$30,000</p>
              </div>
              <div>
                <span style={{ color: '#60a5fa' }}>●</span> Interest
                <p>$2,500</p>
              </div>
              <div>
                <span style={{ color: '#818cf8' }}>●</span> Fees
                <p>$500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLoanCalculator;