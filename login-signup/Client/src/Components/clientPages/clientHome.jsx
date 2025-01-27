import React from "react";
import { Bell, HelpCircle, Search } from "lucide-react"; // Removed unused imports
import '../sidebar.css';
import "./clientStyling/clientHome.css";
import { PieChart, Pie, Cell, Legend } from 'recharts';



const ProfilePanel = ({ onClose }) => {
  return (
    <div className="profile-panel">
      <div className="profile-panel__overlay">
        <div className="profile-panel__content">
          <button 
            className="profile-panel__close" 
            onClick={(e) => {
              e.preventDefault();
              const panel = document.querySelector('.profile-panel');
              if (panel) panel.style.display = 'none';
            }}
          >×</button>
          
          <h2 className="profile-panel__title">Personal Details</h2>
          
          <div className="profile-panel__photo">
            <div className="profile-panel__photo-placeholder">
              Profile Photo
            </div>
            <button className="profile-panel__photo-button">
              Change Profile Photo
            </button>
          </div>

          <div className="profile-panel__form">
            <div className="profile-panel__row">
              <div className="profile-panel__field">
                <label>First Name</label>
                <input type="text" defaultValue="James" />
              </div>
              <div className="profile-panel__field">
                <label>Last Name</label>
                <input type="text" defaultValue="Bond" />
              </div>
            </div>

            <div className="profile-panel__row">
              <div className="profile-panel__field">
                <label>Email</label>
                <input type="email" defaultValue="spymail@gmail.com" />
              </div>
              <div className="profile-panel__field">
                <label>Phone Number</label>
                <input type="tel" defaultValue="+264 81 243 7745" />
              </div>
            </div>

            <div className="profile-panel__row">
              <div className="profile-panel__field">
                <label>National Identification Number</label>
                <input type="text" defaultValue="2011FE33007" />
              </div>
              <div className="profile-panel__field">
                <label>Postal Address</label>
                <input type="text" defaultValue="P.O. Box 007 Windhoek" />
              </div>
            </div>

            <div className="profile-panel__field">
              <label>Residential Address</label>
              <input 
                type="text" 
                defaultValue="House No. 45, Wambo Street Klein Kuppe Windhoek, Namibia 9000" 
              />
            </div>

            <div className="profile-panel__row">
              <div className="profile-panel__field">
                <label>Bank Name</label>
                <input type="text" defaultValue="Bank Windhoek" />
              </div>
              <div className="profile-panel__field">
                <label>Bank Account Number</label>
                <input type="text" defaultValue="8152094531" />
              </div>
            </div>

            <div className="profile-panel__actions">
              <button className="profile-panel__button profile-panel__button--edit">
                Edit Details
              </button>
              <button className="profile-panel__button profile-panel__button--delete">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientHome = () => {
  const pieData = [
    { name: "Loans", value: 40, color: "#4c4cff" },
    { name: "Payments", value: 25, color: "#10b981" },
    { name: "Savings", value: 20, color: "#fbbf24" },
    { name: "Investments", value: 15, color: "#ef4444" }
  ];

  const openProfilePanel = () => {
    const panel = document.querySelector('.profile-panel');
    if (panel) panel.style.display = 'block';
  };
  
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        {/* Top Bar */}
        <div className="dashboard__topbar">
          <div className="search-box">
            <Search className="search-box__icon" />
            <input type="text" placeholder="Search..." className="search-box__input" />
          </div>
          <div 
            className="user-panel"
            onClick={openProfilePanel} // Trigger the panel to open
            style={{ cursor: 'pointer' }}
          >
            <Bell className="user-panel__icon" />
            <HelpCircle className="user-panel__icon" />
            <div className="user-panel__avatar"></div>
            <div className="user-panel__info">
              <span className="user-panel__text">Enter Text</span>
              <span className="user-panel__name">Hello, Welcome Back</span>
            </div>
          </div>
        </div>

        {/* Profile Panel */}
        <ProfilePanel />

        {/* Dashboard Grid */}
        <div className="dashboard__grid">
          {/* Overview Card */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2 className="dashboard-card__title">Overview</h2>
              <span className="dashboard-card__date">February 2025</span>
            </div>
            <div className="stats-grid">
              <div className="stats-item">
                <div className="stats-item__value">29</div>
                <div className="stats-item__label">Transaction</div>
              </div>
              <div className="stats-item">
                <div className="stats-item__value">18</div>
                <div className="stats-item__label">Income</div>
              </div>
              <div className="stats-item">
                <div className="stats-item__value">11</div>
                <div className="stats-item__label">Outcome</div>
              </div>
            </div>
            <div className="calendar-grid">
              {Array.from({ length: 28 }, (_, i) => (
                <div
                  key={i}
                  className={`calendar-grid__day ${i === 16 ? 'calendar-grid__day--active' : ''}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Balance Card */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2 className="dashboard-card__title">Your Balance</h2>
              <select className="currency-select">
                <option>Namibia Dollar</option>
              </select>
            </div>
            <div className="balance-info">
              <div className="balance-info__amount">$234,000.00</div>
              <div className="balance-info__change">+24.17% Compared to last month</div>
            </div>
            <img 
              src="/api/placeholder/400/200"
              alt="Balance illustration"
              className="balance-info__image"
            />
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2 className="dashboard-card__title">Quick Action</h2>
              <span className="dashboard-card__subtitle">Manage</span>
            </div>
            <div className="quick-actions">
              <button className="quick-actions__button">
                <span>→</span>
                Make Payment
              </button>
              <button className="quick-actions__button">
                <span>←</span>
                Apply for a Loan
              </button>
              <div className="quick-actions__grid">
                <button className="quick-actions__link">
                  🎯 Loan Offers
                </button>
                <button className="quick-actions__link">
                  💡 Financial Tips
                </button>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="dashboard-card dashboard-card--wide">
            <div className="dashboard-card__header">
              <h2 className="dashboard-card__title">Account Activity</h2>
              <button className="dashboard-card__action">Filter</button>
            </div>
            <div className="activity-table__wrapper">
              <table className="activity-table">
                <tbody>
                  {[
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
                    }
                  ].map((item, index) => (
                    <tr key={index} className="activity-table__row">
                      <td className="activity-table__cell">{item.date}</td>
                      <td className="activity-table__cell">{item.description}</td>
                      <td className="activity-table__cell">
                        <span className={`status-badge status-badge--${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="activity-table__cell">{item.type}</td>
                      <td className="activity-table__cell activity-table__cell--amount">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data & Insights Card */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2 className="dashboard-card__title">Data & Insights</h2>
              <button className="dashboard-card__action dashboard-card__action--primary">View More</button>
            </div>
            <div className="insights-chart">
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
    </div>
  );
};

export default ClientHome;