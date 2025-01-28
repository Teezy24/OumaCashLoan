import React from 'react'
import '../sidebar.css';
import "./clientStyling/clientLoanHistory.css";
import { PieChart, Pie, Cell, Legend } from "recharts";


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
          <div className="client-loan-history__account-activity">
            <h3>Account Activity</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Method</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Feb 13</td>
                  <td>Horizon Auto Loan Funding</td>
                  <td>Pending</td>
                  <td>Bank Transfer</td>
                  <td>N$350,000</td>
                </tr>
                <tr>
                  <td>Feb 5</td>
                  <td>Cruz Home Loan Repayment</td>
                  <td>Success</td>
                  <td>Bank Transfer</td>
                  <td>N$50,000</td>
                </tr>
                <tr>
                  <td>Jan 27</td>
                  <td>Millennium Loan Funding</td>
                  <td>Failed</td>
                  <td>Bank Transfer</td>
                  <td>N$550,000</td>
                </tr>
                <tr>
                  <td>Jan 25</td>
                  <td>The Big Plan Loan Funding</td>
                  <td>Ongoing</td>
                  <td>Bank Transfer</td>
                  <td>N$10,000</td>
                </tr>
                <tr>
                  <td>Jan 25</td>
                  <td>Johnson Loan Funding</td>
                  <td>Cancelled</td>
                  <td>Bank Transfer</td>
                  <td>N$30,000</td>
                </tr>
              </tbody>
            </table>
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