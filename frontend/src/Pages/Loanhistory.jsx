import React, { useState, useEffect } from "react";
import Sidebar from "../Components/clientSidebar";
import '../css/LoanHistory.css'
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";

import { FiArrowDownLeft } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

import { PieChart, Pie, Cell, Legend } from 'recharts';


const UserOverview = ({ user }) => {
  return (
    <div className="dashboard-header">
      <h1>{user.name || "User"}!</h1>
      <p >{user.email || "N/A"}</p>
      <img src="C:\Users\Simeon\Desktop\LoanManagement2\frontend\src\assets\logo.jpg" alt=" this is a profile pic" className='profile-picture' />
      <button className='notif-button'><FaBell /></button>
      <button className='help-button'><FaQuestionCircle /></button>
      <input type="text" placeholder="Search" className='search-input' />
      <button className='search-button'><FaSearch /></button>
      {localStorage.setItem('user-id', user.id)}
    </div>
  );
};

const LoanSummary = ({ loans }, { user }) => {

    return (
        <div className="loan-summary-Card">
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



const loanHistory = () => {
    const [loanSummary, setLoanSummary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});

    const [progress, setProgress] = useState(40);

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
            console.log("Loan Data:", loanData.data);
    
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

    const pieData = [
        { name: "Loans", value: 40, color: "#4c4cff" },
        { name: "Payments", value: 25, color: "#10b981" },
        { name: "Savings", value: 20, color: "#fbbf24" },
        { name: "Investments", value: 15, color: "#ef4444" }
      ];
    return (
        <div>
            <Sidebar />
            <div className='loanHistory-container'>
                <div className='chart-Activity-container'>
                    <div className="LoanChart-Card">
                        <div className="LoanChart-Card-header">
                            <h2>Monthly Loans</h2>
                            <select
                                className="Monthy-dropDown"
                            >
                                <option value="month">Last Month</option>
                                <option value="2months">Last 2 Months</option>
                                <option value="3months">Last 3 Months</option>
                                <option value="4months">Last 4 Months</option>
                                <option value="5months">Last 5 Months</option>
                                <option value="6months">Last 6 Months</option>
                                <option value="7months">Last 7 Months</option>
                                <option value="8months">Last 8 Months</option>
                                <option value="9months">Last 9 Months</option>
                                <option value="10months">Last 10 Months</option>
                                <option value="11months">Last 11 Months</option>
                                <option value="12months">Last 12 Months</option>

                            </select>

                        </div>

                    </div>
                    <div className="Activity-Card">
                        <LoanSummary loans={loanSummary} />
                    </div>
                </div>

                <div className='LoanHistory-stat-container'>
                    <div className="payment-process-card">
                        <div className='payment-process-card-header'>
                            <h3>Payment Progress</h3>
                        </div>
                        <div className="loanType-drop">
                            <select
                                className="loanType-dropDown"
                            >
                                <option value="LoanType">LoanType</option>

                            </select>

                        </div>
                        <div className='stat-progressbar'>
                            {/* add a progrssbar */}
                            <ProgressBar className='progressbar' completed={60} />

                        </div>

                    </div>
                    <div className="count-card">
                        <div className="count-card-header">
                            <h3>Counts</h3>
                        </div>
                        <div className='count-card-body'>
                            <div className="TotalLoans">
                                <label htmlFor="TotalLoans"> Total Loans </label>
                                <IoIosArrowForward className="TotalLoansArrow-icon"/>
                            </div>
                            <div className="TotalLoans-span">
                                <span>5</span>
                            </div>
                        </div>

                    </div>

                    <div className="overallStatus-Card">
                        <div className="overallStatus-Card-header">
                            <h3>Overall Loan Status </h3>

                        </div>
                        <div className = 'overallStatus-Chart'>
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
                                        <p>current Loan performance is Excelent</p>

                        </div>
                     

                    </div>

                </div>


            </div>
        </div>
    )
}
export default loanHistory