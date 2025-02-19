import React, { useState } from "react";
import "./adminStyling/adminHome.css";
import { IoFilterOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCheckCircle, FaEye, FaEdit, FaTrash, FaFilter, FaSortAmountUp } from "react-icons/fa";
import { FaComments, FaTimesCircle, FaExclamationTriangle, FaSearch, FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog } from "react-icons/fa";

const AdminHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30 days");

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const [tasks, setTasks] = useState(["", "", "", ""]); 

const handleTaskChange = (index, value) => {
  const updatedTasks = [...tasks];
  updatedTasks[index] = value;
  setTasks(updatedTasks);
};

const addTask = () => {
  setTasks([...tasks, ""]); 
};

const removeTask = (index) => {
  const updatedTasks = tasks.filter((_, i) => i !== index);
  setTasks(updatedTasks);
};

const users = [
  { id: 1, name: "Miar Zek", email: "miar@nova.laravel.com" },
  { id: 2, name: "John Doe", email: "john@nova.laravel.com" },
  { id: 3, name: "Jane Smith", email: "jane@nova.laravel.com" },
  { id: 4, name: "Alice Brown", email: "alice@nova.laravel.com" },
  { id: 5, name: "Bob White", email: "bob@nova.laravel.com" },
  { id: 6, name: "Charlie Black", email: "charlie@nova.laravel.com" },
  { id: 7, name: "David Green", email: "david@nova.laravel.com" }
];

  return (

    <div className="dashboard-wrapper">
      
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="dashboard-header-left">
          </div>
        </header>

        <div className="dashboard-main">
          <div className="main-left">
            <div className="stats-section">
              <div className="stat-card">
              <div className="period-container">
                <p>Pending Applications</p>
                <span>
                  <select value={selectedPeriod} onChange={handlePeriodChange} className="dropdown">
                    <option value="1 week">1 week</option>
                    <option value="30 days">30 days</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="All">All</option>
                  </select>
                </span>
                </div>
                <div className="stat-container">
                <FaComments className="stat-icon" />
                <h2>12</h2>
                </div>
              </div>
              <div className="stat-card">
              <div className="period-container">
                <p>Forwarded Applications</p>
                <span>
                  <select value={selectedPeriod} onChange={handlePeriodChange} className="dropdown">
                    <option value="1 week">1 week</option>
                    <option value="30 days">30 days</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="All">All</option>
                  </select>
                </span>
                </div>
                <div className="stat-container">
                <FaComments className="stat-icon" />
                <h2>14</h2>
                </div>
              </div>
              <div className="stat-card">
                <div className="period-container">
                <p>Rejected Applications</p>
                <span>
                  <select value={selectedPeriod} onChange={handlePeriodChange} className="dropdown">
                    <option value="1 week">1 week</option>
                    <option value="30 days">30 days</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="All">All</option>
                  </select>
                </span>
                </div>
                <div className="stat-container">
                <FaTimesCircle className="stat-icon" />
                <h2>0</h2>
                </div>
              </div>
              <div className="stat-card">
              <div className="period-container">
                <p>Document Issues</p>
                <span>
                  <select value={selectedPeriod} onChange={handlePeriodChange} className="dropdown">
                    <option value="1 week">1 week</option>
                    <option value="30 days">30 days</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                    <option value="All">All</option>
                  </select>
                </span>
                </div>
                <div className="stat-container"> 
                             <FaExclamationTriangle className="stat-icon" />
                         <h2>4</h2>
                     </div>
              </div>
            </div>
            <h2 className="title">Borrowers</h2>
            <div className="search-bar">
                <input type="text" placeholder="Search by name or email address" />
                <button>
                  <FaSearch />
                </button>
              </div>

              <div className="borrowers-container-1">
      <div className="header-1">
        <div className="sort-icon-1"><RiArrowDropDownLine size={20} /></div>
        <div className="filter-icon-1"><IoFilterOutline  size={20} /></div>
      </div>
      <table className="borrowers-table-1">
        <thead>
          <tr>
            <th><input type="checkbox" className="checkbox-1" /></th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Loan Request</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td><input type="checkbox" className="checkbox-2" /></td>
              <td>{index + 1}</td>
              <td><a href="#" className="user-link-1">{user.name}</a></td>
              <td><a href="#" className="user-email-1">{user.email}</a></td>
              <td>
                <div className="icon-container-1">
                  <span className="status-1 status-green-1"><FaCheckCircle size={15} /></span>
                  <a href="#" className="action-btn-1 view-btn-1"><FaEye size={15} /></a>
                  <a href="#" className="action-btn-1 edit-btn-1"><FaEdit size={15} /></a>
                  <a href="#" className="action-btn-1 delete-btn-1"><FaTrash size={15} /></a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-1">
      <button className="pagination-btn pagination-prev">Previous</button>
      <span className="pagination-info">1-7 of 7</span>
      <button className="pagination-btn pagination-next">Next</button>
    </div>

    </div>
    </div>
          
        </div>
      </div>
      <div className="main-right-container"> 
            <div className="dark-container">
              <div className="timeline-container">
              <div className="dashboard-header-right">
                <h5 className="title">Enter Text</h5>
            <input type="text" placeholder="Enter Text" className="header-input" />
          </div>
                <hr></hr>
                <h2 className="title">Timeline</h2>
                <div className="timeline">
                  <ul>
                    <li>
                      <span>10:00 AM, Jan 5, 2025</span> Task assigned to Mike
                    </li>
                    <li>
                      <span>8:30 AM, Jan 5, 2025</span> Loan review meeting
                    </li>
                  </ul>
                </div>
              </div>

<div className="to-do-list-container">
  <div className="todo-header">
    <h2 className="title">To-do List</h2>
    <div className="todo-actions">
      <button className="todo-action-button" onClick={addTask}>
        +
      </button>
    </div>
  </div>
  <div className="to-do-list">
    <ul>
      {tasks.map((task, index) => (
        <li key={index} className="todo-item">
          <input
            type="text"
            value={task}
            onChange={(e) => handleTaskChange(index, e.target.value)}
            placeholder={`Task ${index + 1}`}
            className="todo-input"
          />
          <button
            className="remove-task-button"
            onClick={() => removeTask(index)}
          >
            ✖
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>

            </div>
          </div>
    </div>
  );
};

export default AdminHome;
