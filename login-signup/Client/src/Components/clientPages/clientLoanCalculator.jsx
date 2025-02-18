import React, { useState } from "react";
import './clientStyling/clientLoanCalculator.css';

const ClientLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLaonTerm] = useState('');
  const [interestRate, setInterestRate] = useState(5);
  const [installment, setInstallment] = useState(null);

  const clientLoanCalculator = (e) => {
      e.preventDefault();

      if(!loanAmount || !loanTerm || !interestRate){
          alert ('Please fill in all the fields.')
          return;
      }

      const P = parseFloat(loanAmount);
      const r = parseFloat(interestRate) /12/100;
      const n = parseFloat(loanTerm, 10);

      const emi = (P * r * Math.pow(1 + r,n)) / (Math.pow(1 + r, n) -1);
      setInstallment(emi.toFixed(2))
  }


  return (
      <div>
    
          <div className = 'calContainer'>
              <h1> Loan Calculator</h1>
              <p>the calculated amount of the loan is approximate. The exact amount is to be determined individually</p>

              <div className = 'calBox-container'>
               <div className = 'calBox'>
                  <form onSubmit={clientLoanCalculator}>
                  <label htmlFor="how much" className="label-amount">How much do you need?</label>
                  <input type="number" value = {loanAmount} className = 'calAmount1' placeholder=" Enter amount" onChange={(e) => setLoanAmount(e.target.value)}/>

                  <label htmlFor="monthly" className = 'label-monthly'>How many months do you need?</label>
                  <input type="number" className = 'calAmount2' value={loanTerm} placeholder="Months" onChange ={(e) => setLaonTerm(e.target.value)}/>

                  <button type = 'submit'>CALCULATE</button>
                  </form>
                  <div className='solutionContainer'>
                      <p>You will Pay:</p>
                       <span>N${installment}</span>
                       <p>Per Month</p>
                  </div>
               </div>


              <div className = 'calBox2'>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3>In Total</h3>
            <h2>$33,000</h2>
          </div>
                      {/* Hardcoded graph for now */}
                      <div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
            <svg viewBox="0 0 200 200" width="200" height="200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#7c3aed" strokeWidth="30" strokeDasharray="377 502" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#60a5fa" strokeWidth="30" strokeDasharray="126 502" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#818cf8" strokeWidth="30" strokeDasharray="25 502" />
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '40px' }}>
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

  )


}

export default ClientLoanCalculator;
