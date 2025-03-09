import React, { useState, useEffect, useContext } from 'react';
import '../sidebar.css';
import "./clientStyling/clientLoanHistory.css";
import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { IoIosArrowForward } from "react-icons/io";
import api from '../../axiosConfig'; // Import the configured Axios instance
import { AuthContext } from '../../AuthContext'; // Import the AuthContext

const ClientLoanHistory = () => {
  const { user } = useContext(AuthContext);
  const [loanApplications, setLoanApplications] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("Cruz Home Loan");

  useEffect(() => {
    const fetchLoanApplications = async () => {
      try {
        const response = await api.get('/user/loanApplications');
        console.log('Response data:', response.data);
        
        if (Array.isArray(response.data)) {
          setLoanApplications(response.data);
        } else if (response.data.error) {
          console.error('API Error:', response.data.error);
          setLoanApplications([]); // Handle authentication error
        } else {
          console.error('Unexpected response format:', response.data);
          setLoanApplications([]);
        }
      } catch (error) {
        console.error('Error fetching loan applications:', error);
        setLoanApplications([]);
      }
    };

    if (user && user.user_id) {
      fetchLoanApplications();
    }
  }, [user?.user_id]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num.toString();
    }
  };

  const activityData = loanApplications.map(loan => ({
    date: new Date(loan.created_at).toLocaleDateString(),
    description: loan.description,
    status: loan.status.toLowerCase(),
    type: loan.transfer_method,
    amount: `N$${formatNumber(loan.loan_amount)}`
  }));

  const pieData = [
    { name: "Pending", value: loanApplications.filter(loan => loan.status === "Pending").length, color: "#fbbf24" },
    { name: "Approved", value: loanApplications.filter(loan => loan.status === "Approved").length, color: "#10b981" },
    { name: "Rejected", value: loanApplications.filter(loan => loan.status === "Rejected").length, color: "#ef4444" }
  ];

  const formattedLoanApplications = loanApplications.map(loan => ({
    ...loan,
    loan_amount: isNaN(loan.loan_amount) ? 0 : Number(loan.loan_amount),
    created_at: new Date(loan.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  }));

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
              <ResponsiveContainer width="100%" height= {240} >
                <BarChart data={formattedLoanApplications} margin={{ top: 10, right: 10, left: 30, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="created_at" axisLine={false} tickLine={false} label={{ value: 'Date', position: 'insideBottom', offset: -20, dx: -45 }} />
                  <YAxis domain={[0, 'dataMax + 1']} axisLine={false} tickLine={false} label={{ value: 'Loan Amount', angle: -90, position: 'insideLeft', offset: -18, dy: 45}} tickFormatter={formatNumber} />
                  <Tooltip formatter={(value) => `N$${formatNumber(value)}`} />
                  <Bar dataKey="loan_amount" fill="#6366F1" radius={[4, 4, 0, 0]} />
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
                <span className="c-history-count-value">{loanApplications.length}</span>
              </div>
            </div>
          </div>

          {/* Overall Loan Performance Card */}
          <div className="c-history-card">
            <div className="c-history-card-header">
              <h3 className="c-history-card-title">Overall Loan Performance</h3>
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
                    <tspan x="50%" dy="-5" className="c-history-donut-value">{loanApplications.length > 0 ? `${Math.round((loanApplications.filter(loan => loan.status === "Approved").length / loanApplications.length) * 100)}%` : '0%'}</tspan>
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