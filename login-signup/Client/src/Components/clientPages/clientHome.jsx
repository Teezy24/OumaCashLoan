import React, { useState } from "react";
import { Bell, HelpCircle, Search, ArrowLeft, Camera } from "lucide-react";
import Calendar from 'react-calendar';
import '../sidebar.css';
import "./clientStyling/clientHome.css";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const ProfilePanel = ({ isOpen, togglePanel }) => {
  if (!isOpen) return null;

  return (
    <div className={`ch-profile-panel ${isOpen ? 'ch-panel-open' : 'ch-panel-closed'}`}>
      <div className="ch-profile-header">
        <button className="ch-back-button" onClick={togglePanel}>
          <ArrowLeft size={20} />
        </button>
        <h2 className="ch-profile-title">Personal Details</h2>
      </div>
      <div className="ch-profile-content">
        <div className="ch-photo-section">
          <div className="ch-photo-container">
            <div className="ch-photo-placeholder">
              <Camera size={32} color="#666" />
            </div>
            <button className="ch-change-photo-btn">
              <Camera size={16} />
              Change Profile Photo
            </button>
          </div>
        </div>

        <div className="ch-form">
          <div className="ch-form-row">
            <div className="ch-form-group">
              <label>First Name</label>
              <input type="text" placeholder="James" className="ch-form-input" />
            </div>
            <div className="ch-form-group label">
              <label>Last Name</label>
              <input type="text" placeholder="Bond" className="ch-form-input" />
            </div>
          </div>

          <div className="ch-form-row">
            <div className="ch-form-group">
              <label>Email</label>
              <input type="email" placeholder="spymail@gmail.com" className="ch-form-input" />
            </div>
            <div className="ch-form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+264 81 243 7745" className="ch-form-input" />
            </div>
          </div>

          <div className="ch-form-row">
            <div className="ch-form-group">
              <label>National Identification Number</label>
              <input type="text" placeholder="2011FE33007" className="ch-form-input" />
            </div>
            <div className="ch-form-group">
              <label>Postal Address</label>
              <input type="text" placeholder="P.O. Box 007 Windhoek" className="ch-form-input" />
            </div>
          </div>

          <div className="ch-form-group ch-form-full-width">
            <label>Residential Address</label>
            <input 
              type="text" 
              placeholder="House No. 45, Wambo Street Klein Kuppe Windhoek, Namibia 9000" 
              className="ch-form-input"
            />
          </div>

          <div className="ch-form-row">
            <div className="ch-form-group">
              <label>Bank Name</label>
              <input type="text" placeholder="Bank Windhoek" className="ch-form-input" />
            </div>
            <div className="ch-form-group">
              <label>Bank Account Number</label>
              <input type="text" placeholder="8152094531" className="ch-form-input" />
            </div>
          </div>

          <div className="ch-button-group">
            <button className="ch-edit-button">Edit Details</button>
            <button className="ch-delete-button">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientHome = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
  const [date, setDate] = useState(new Date()); 

  const loanPaymentDates = [
    { date: '2025-02-25', type: 'payment', amount: 5000 },
    { date: '2025-03-15', type: 'due', amount: 7500 },
    { date: '2025-03-25', type: 'payment', amount: 5000 }
  ];
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const event = loanPaymentDates.find(e => e.date === formattedDate);
      
      if (event) {
        return (
          <div className={`ch-calendar-event ch-calendar-event-${event.type}`}>
            <span className="ch-calendar-event-dot"></span>
          </div>
        );
      }
    }
    return null;

  };
  const pieData = [
    { name: "Loans", value: 40, color: "#4c4cff" },
    { name: "Payments", value: 25, color: "#10b981" },
    { name: "Savings", value: 20, color: "#fbbf24" },
    { name: "Investments", value: 15, color: "#ef4444" }
  ];

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


const CalendarCard = () => {

  const [value, onChange] = useState(new Date());

};

  return (
    <div className="ch-dashboard">
      <div className="ch-topbar">
        <div className="ch-search-container">
          <Search className="ch-search-icon" />
          <input type="text" placeholder="Search..." className="ch-search-input" />
        </div>
        <div className="ch-user-panel" onClick={togglePanel}>
          <Bell className="ch-icon" />
          <HelpCircle className="ch-icon" />
          <div className="ch-avatar"></div>
          <div className="ch-user-info">
            <span className="ch-user-text">Enter Text</span>
            <span className="ch-user-welcome">Hello, Welcome Back</span>
          </div>
        </div>
      </div>

      <ProfilePanel isOpen={isPanelOpen} togglePanel={togglePanel} />

      <div className="ch-grid">
        {/* Overview Card */}
        <div className="ch-card">
          <div className="ch-card-header">
            <h2 className="ch-card-title">Overview</h2>
            <span className="ch-card-date">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
          

        {/* Calendar card */}
        <div className="ch-calendar-overview">
        <div className="ch-stats-container">
          {[
            { value: "29", label: "Transaction" },
            { value: "18", label: "Income" },
            { value: "11", label: "Outcome" }
          ].map((stat, index, array) => (
            <div key={index} className="ch-stat-block">
              <div className="ch-stat-value">{stat.value}</div>
              <div className="ch-stat-label">{stat.label}</div>
              {index < array.length - 1 && <div className="ch-stat-divider"></div>}
            </div>
      ))}
    </div>
    
    <div className="ch-calendar-summary">
            <div className="ch-summary-item">
              <span className="ch-summary-label">Next Payment Due:</span>
              <span className="ch-summary-value">March 15, 2025</span>
            </div>
            <div className="ch-summary-item">
              <span className="ch-summary-label">Amount Due:</span>
              <span className="ch-summary-value">N$7,500</span>
            </div>
          </div>
  </div>
</div>

  {/* Loan Calendar Section */}
  <div className="ch-card">
          <div className="ch-card-header">
            <h2 className="ch-card-title">Loan Calendar</h2>
            <div className="ch-calendar-legend">
            </div>
          </div>

          <div className="ch-calendar-wrapper">
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              className="loan-calendar"
              tileClassName={({ date, view }) => {
                const formattedDate = date.toISOString().split('T')[0];
                const event = loanPaymentDates.find(e => e.date === formattedDate);
                return event ? `ch-calendar-tile-${event.type}` : '';
              }}
            />
          </div>

        </div>

        {/* Balance Card */}
        <div className="ch-card">
          <div className="ch-card-header">
            <h2 className="ch-card-title">Your Balance</h2>
            <select className="ch-currency-select">
              <option>Namibia Dollar</option>
            </select>
          </div>
          <div className="ch-balance">
            <div className="ch-balance-amount">$234,000.00</div>
            <div className="ch-balance-change">+24.17% Compared to last month</div>
          </div>
          <img 
            src="/api/placeholder/400/200"
            alt="Balance illustration"
            className="ch-balance-image"
          />
        </div>

        {/* Quick Actions Card */}
        <div className="ch-card">
          <div className="ch-card-header">
            <h2 className="ch-card-title">Quick Action</h2>
            <span className="ch-card-subtitle">Manage</span>
          </div>
          <div className="ch-actions">
            <button className="ch-action-button">
              <span className="ch-action-icon">→</span>
              Make Payment
            </button>
            <button className="ch-action-button">
              <span className="ch-action-icon">←</span>
              Apply for a Loan
            </button>
            <div className="ch-action-grid">
              <button className="ch-action-link">
                🎯 Loan Offers
              </button>
              <button className="ch-action-link">
                💡 Financial Tips
              </button>
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="ch-card ch-card-wide">
          <div className="ch-card-header">
            <h2 className="ch-card-title">Account Activity</h2>
            <button className="ch-card-action">Filter</button>
          </div>
          <div className="ch-table-wrapper">
            <table className="ch-table">
              <thead>
                <tr className="ch-table-header">
                  <th className="ch-table-th">Date</th>
                  <th className="ch-table-th">Description</th>
                  <th className="ch-table-th">Status</th>
                  <th className="ch-table-th">Method</th>
                  <th className="ch-table-th">Amount</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((item, index) => (
                  <tr key={index} className="ch-table-row">
                    <td className="ch-table-cell">{item.date}</td>
                    <td className="ch-table-cell">{item.description}</td>
                    <td className="ch-table-cell">
                      <span className={`ch-status ch-status-${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="ch-table-cell">{item.type}</td>
                    <td className="ch-table-cell ch-amount">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data & Insights Card */}
        <div className="ch-card">
          <div className="ch-card-header">
            <h2 className="ch-card-title">Data & Insights</h2>
            <button className="ch-card-action ch-action-primary">View More</button>
          </div>
          <div className="ch-chart">
            <PieChart width={300} height={300}>
              <Pie 
                data={pieData} 
                cx="50%" 
                cy="50%" 
                innerRadius={60} 
                outerRadius={80} 
                paddingAngle={5} 
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle" 
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;