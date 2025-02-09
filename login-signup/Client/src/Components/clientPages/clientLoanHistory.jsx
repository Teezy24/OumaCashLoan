import React from 'react'
import '../sidebar.css';
import "./clientStyling/clientLoanHistory.css";
import { PieChart, Pie, Cell, Legend } from "recharts";

const activityData = [
  {
    date: "Feb 12",
    description: "Namibia Bank Loan Funding",
    status: "pending",
    type: "Bank Transfer",
    amount: "N$200,000"
  },
  {
    date: "Feb 5",
    description: "One Home Loan Repayment",
    status: "success",
    type: "Bank Transfer",
    amount: "N$52,000"
  },
  {
    date: "Jan 27",
    description: "Millennium Loan Funding",
    status: "failed",
    type: "Bank Transfer",
    amount: "N$50,000"
  },
  {
    date: "Jan 25",
    description: "The Big Plan Loan Funding",
    status: "pending",
    type: "Bank Transfer",
    amount: "N$10,000"
  },
  
];

const ClientLoanHistory = () => {
  return (
    <div className="client-loan-history">
      <div className="client-loan-history__container">
        {/* Left Section: Charts & Account Activity */}
        <div className="client-loan-history__left">
          {/* Monthly Loans Chart */}
          <div className="client-loan-history__chart-container">
            <div className="chart-header">
              <h3>Monthly Loans</h3>
              <select>
                <option>Last 6 months</option>
              </select>
            </div>
            {/* Placeholder for Chart */}
            <div className="chart-placeholder">[Chart]</div>
          </div>

          {/* Account Activity Table */}
          <div className="c-history-card ch-card-wide">
          <div className="c-history-card-header">
            <h2 className="c-history-card-title">Account Activity</h2>
            <button className="c-history-card-action">Filter</button>
          </div>
          <div className="c-history-table-wrapper">
            <table className="c-history-table">
              <thead>
                <tr className="c-history-table-header">
                  <th className="c-history-table-th">Date</th>
                  <th className="c-history-table-th">Description</th>
                  <th className="c-history-table-th">Status</th>
                  <th className="c-history-table-th">Method</th>
                  <th className="c-history-table-th">Amount</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((item, index) => (
                  <tr key={index} className="c-history-table-row">
                    <td className="c-history-table-cell">{item.date}</td>
                    <td className="c-history-table-cell">{item.description}</td>
                    <td className="c-history-table-cell">
                      <span className={`c-history-status c-history-status-${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="c-history-table-cell">{item.type}</td>
                    <td className="c-history-table-cell ch-amount">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        {/* Right Section: Loan Status */}
        <div className="client-loan-history__right">
          <div className="client-loan-history__progress">
            <h3>Payment Progress</h3>
            <p>65% Paid</p>
          </div>
          <div className="client-loan-history__count">
            <h3>Count</h3>
            <p>58 Total Loans</p>
          </div>
          <div className="client-loan-history__status">
            <h3>Overall Loan Status</h3>
            <p>87% Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLoanHistory;