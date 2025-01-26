import React, { useState } from "react";
import "./clientStyling/clientLoanCalculator.css";
import '../sidebar.css';



const ClientLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLaonTerm] = useState('');
  const [interestRate, setInterestRate] = useState(5);
  const [installment, setInstallment] = useState(null);

  const ClientLoanCalculator = (e) => {
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
          <div className = ''>
              <h1> Loan Calculator</h1>
              <p>the calculated amount of the loan is approximate. The exact amount is to be determined individually</p>

              <div className = 'calBox'>
                  <form onSubmit={ClientLoanCalculator}>
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
          </div>
      </div>

  )
}

export default ClientLoanCalculator;