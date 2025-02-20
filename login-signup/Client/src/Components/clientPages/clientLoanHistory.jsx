import React, { useState } from 'react';
import '../sidebar.css';
import "./clientStyling/clientLoanHistory.css";
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IoIosArrowForward } from "react-icons/io";

// Monthly loan data
const monthlyLoanData = [
  { month: 'Jan', value: 1 },
  { month: 'Feb', value: 4 },
  { month: 'Mar', value: 2 },
  { month: 'Apr', value: 2 },
  { month: 'May', value: 1 },
  { month: 'Jun', value: 1 }
];

// Activity data
const activityData = [
  {
    date: "Feb 13",
    description: "Heritage Auto Loan Funding",
    status: "pending",
    type: "Bank Transfer",
    amount: "N$350,000"
  },
  {
    date: "Feb 5",
    description: "Cruz Home Loan Repayment",
    status: "success",
    type: "Bank Transfer",
    amount: "N$50,000"
  },
  {
    date: "Jan 27",
    description: "Millennium Loan Funding",
    status: "failed",
    type: "Bank Transfer",
    amount: "N$550,000"
  },
  {
    date: "Jan 26",
    description: "The Big Plan Loan Funding",
    status: "pending",
    type: "Bank Transfer",
    amount: "N$10,000"
  },
  {
    date: "Jan 25",
    description: "Johnson Loan Funding",
    status: "canceled",
    type: "Bank Transfer",
    amount: "N$30,000"
  }
];

// Pie chart data
const pieData = [
  { name: "0-19%", value: 5, color: "#ef4444" },
  { name: "20-39%", value: 10, color: "#fbbf24" },
  { name: "40-59%", value: 15, color: "#d97706" },
  { name: "60-79%", value: 25, color: "#a3e635" },
  { name: "80-100%", value: 45, color: "#10b981" }
];

const ClientLoanHistory = () => {
  const [selectedLoan, setSelectedLoan] = useState("Cruz Home Loan");
  
  return (
    <div className="c-history-page">
      <div className="c-history-container">
        {/* Left Column */}
        <div className="c-history-left-column">
          {/* Monthly Loans Chart */}
          <div className="c-history-card">
            <div className="c-history-card-header">
              <h3 className="c-history-card-title">Monthly Loans</h3>
              <div className="c-history-dropdown">
                <select className="c-history-select">
                  <option>Last 6 months</option>
                </select>
              </div>
            </div>
            <div className="c-history-chart">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyLoanData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Account Activity Table */}
          <div className="c-history-card">
            <div className="c-history-card-header">
              <h3 className="c-history-card-title">Account Activity</h3>
              <button className="c-history-filter-btn">
                <span>Filter</span>
              </button>
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
                      <td className="c-history-table-cell c-history-amount">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="c-history-right-column">
          {/* Payment Progress Card */}
          <div className="c-history-card">
            <div className="c-history-card-header">
              <h3 className="c-history-card-title">Payment Progress</h3>
              <div className="c-history-dropdown">
                <select className="c-history-select" value={selectedLoan} onChange={(e) => setSelectedLoan(e.target.value)}>
                  <option>Cruz Home Loan</option>
                  <option>Heritage Auto Loan</option>
                  <option>The Big Plan Loan</option>
                </select>
              </div>
            </div>
            <div className="c-history-progress-container">
              <div className="c-history-progress-bar">
                <div className="c-history-progress-fill" style={{ width: '65%' }}>65%</div>
                <div className="c-history-progress-empty"></div>
              </div>
              <div className="c-history-progress-labels">
                <span>Paid</span>
                <span>Defaulted</span>
              </div>
            </div>
          </div>

          {/* Count Card */}
          <div className="c-history-card">
            <div className="c-history-card-header">
              <h3 className="c-history-card-title">Count</h3>
            </div>
            <div className="c-history-count-container">
              <div className="c-history-count-row">
                <span className="c-history-count-label">
                  Total Loans
                  <IoIosArrowForward className="c-history-count-icon" />
                </span>
                <span className="c-history-count-value">58</span>
              </div>
            </div>
          </div>

          {/* Overall Loan Status Card */}
          <div className="c-history-card">
            <div className="c-history-card-header">
              <h3 className="c-history-card-title">Overall Loan Status</h3>
            </div>
            <div className="c-history-status-container">
              <div className="c-history-donut-container">
                <PieChart width={240} height={240}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="c-history-donut-text">
                    <tspan x="50%" dy="-5" className="c-history-donut-value">67%</tspan>
                    <tspan x="50%" dy="20" className="c-history-donut-label"></tspan>
                  </text>
                </PieChart>
              </div>
              <div className="c-history-legend-container">
                {pieData.map((entry, index) => (
                  <div key={index} className="c-history-legend-item">
                    <div className="c-history-legend-color" style={{ backgroundColor: entry.color }}></div>
                    <div className="c-history-legend-label">{entry.name}</div>
                  </div>
                ))}
              </div>
              <p className="c-history-status-message">Current loan performance is excellent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLoanHistory;