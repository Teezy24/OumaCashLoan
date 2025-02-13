import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/clientSidebar";
import "../css/Dashboard.css";
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//importing my icons
import { FaBell } from "react-icons/fa6"
import { FaQuestionCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { FiArrowDownLeft } from "react-icons/fi";

import { PieChart, Pie, Cell, Legend } from 'recharts';

// User Overview Component
const UserOverview = ({ user }) => {
  return (
    <div className="dashboard-header">
      <h1>{user.name || "User"}!</h1>
      <p >{user.email || "N/A"}</p>
      <Link to = {'/Profile'}>
      <img src="C:\Users\Simeon\Desktop\LoanManagement2\frontend\src\assets\logo.jpg" alt=" this is a profile pic" className='profile-picture' />
      </Link>
      <button className='notif-button'><FaBell /></button>
      <button className='help-button'><FaQuestionCircle /></button>
      <input type="text" placeholder="Search" className='search-input' />
      <button className='search-button'><FaSearch /></button>
      {localStorage.setItem('user-id', user.id)}
    </div>
  );
};

// Loan Summary Component
const LoanSummary = ({ loans }, { user }) => {
  return (
    <div className="loan-summary">
      <h2><FiArrowDownLeft style={{ color: "lightgreen" }} />Account Activity</h2>
      {loans.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Application Date</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>${loan.amount}</td>
                <td>{loan.status}</td>
                <td>{new Date(loan.date).toLocaleDateString()}</td>
              </tr>


            ))}

          </tbody>
        </table>
      ) : (
        <p>No loan applications submitted yet.</p>
      )}
    </div>
  );
};

// Quick Actions Component
// const QuickActions = () => {
//   return (
//     <div className="quick-actions">
//       <h2>Quick Actions</h2>
//       <div className="actions">
//         <Link to="/apply-loan" className="action-button">
//           Apply for Loan
//         </Link>
//         <Link to="/profile" className="action-button">
//           Edit Profile
//         </Link>
//         <Link to="/upload-documents" className="action-button">
//           Upload Documents
//         </Link>
//       </div>
//     </div>
//   );
// };

// Quick Actions Component
const CalendarCard = () => {

  const [value, onChange] = useState(new Date());

  return (
    <div className="calendarCard">
      <h2>Calendar</h2>
      <Calendar onChange={onChange} value={value} />

    </div>
  );
};

const InsightsCard = () => {
  const pieData = [
    { name: "Loans", value: 40, color: "#4c4cff" },
    { name: "Payments", value: 25, color: "#10b981" },
    { name: "Savings", value: 20, color: "#fbbf24" },
    { name: "Investments", value: 15, color: "#ef4444" }
  ];

  return(
    <div className = 'InsightCard'>
      <div className = 'InsightCard-header'>
        <h1>Data & Insights</h1>
        <button className="InsightCard-header-button">View More</button>
      </div>
      <div className = 'Insight-chart'>
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

  )



};


const BalanceCard = () => {

  return (
    <div className="balanceCard">
      <div className='balanceCard-header'>
        <label htmlFor="YourBalance" className='balanceLabel'> Your Balance</label>

        <select
          className="balance-conversion"
        >
          <option value="NAD">Namibian Dollars</option>
          <option value="USD">US Dollars</option>

        </select>
      </div>
      <div className='balanceCard-body'>
        <p>Balance</p>
        <h1>$234000.00</h1>
        <label htmlFor="dollarSign" className='SignLabel'> <FaDollarSign /></label>

        <p>comapred to last month</p>
        <img src="" alt="balance image" className="balance-img" />


      </div>


    </div>
  );
};

const QuickActions = () => (
  <div className="QuickActionCard">
    <div className='QuickActionCard-header'>
      <label htmlFor="quick-actions" className='quickactionLabel'> Quick Actions</label>
      <button>Manage</button>
    </div>
    <div className='QuickActionCard-body'>
      <button className='Payment-button'><FaArrowRight style={{ color: "green" }} />Make payment</button>
      <button className='LoanApplication-button'><FaArrowLeft style={{ color: "orange" }} />Apply for Loan</button>
    </div>
    <div className='QuickActionCard-footer'>
      <p>Recomendations</p>
      <button className='offer-button'><FaClipboardList />Loan Offers</button>
      <button className='financial-button'><FaLightbulb />Financial tips</button>
    </div>
  </div>
);

// Notifications Component
// const Notifications = ({ notifications }) => {
//   return (
//     <div className="notifications">
//       <h2>Notifications</h2>
//       {notifications.length > 0 ? (
//         <ul>
//           {notifications.map((notification) => (
//             <li key={notification.id}>{notification.message}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No notifications at this time.</p>
//       )}
//     </div>
//   );
// };

// Main Dashboard Component
const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loanSummary, setLoanSummary] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // trying to fetch the data from the local storage

      const fullname = localStorage.getItem('fullname');

      if (fullname) {
        console.log(localStorage.getItem('fullname'))
      }



      const userId = localStorage.getItem('user-id')

      if (userId) {
        console.log(localStorage.getItem('user-id'))
      }
      try {
        const [userData, loanData, notificationsData] = await Promise.all([
          axios.get(`http://localhost:3002/user?fullname=${fullname}`),
          axios.get(`http://localhost:3002/loans?userId=${userId}`),
          axios.get(`http://localhost:3002/notifications?userId=${userId}`),
        ]);

        setUser(userData.data);
        setLoanSummary(loanData.data);
        setNotifications(notificationsData.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };



    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className = 'dashboard-container'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
          <UserOverview user={user} />
          <div className="dashboardCard-container">
            <LoanSummary loans={loanSummary} />
            <BalanceCard />
            <QuickActions />
            <CalendarCard />
            <InsightsCard />
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
