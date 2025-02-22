import React, { useState } from "react";
import "./adminStyling/adminHome.css";
import { IoFilterOutline, IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ArrowLeft, Camera } from "lucide-react";
import { BiBell } from "react-icons/bi";
import { FaCheckCircle, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaComments, FaTimesCircle, FaExclamationTriangle, FaSearch, FaCamera, FaArrowLeft } from "react-icons/fa";

const ProfilePanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`profile-panel ${isOpen ? 'panel-open' : ''}`}>
      <div className="profile-header">
        <button className="back-button" onClick={onClose}>
          <FaArrowLeft size={20} />
        </button>
        <h2 className="profile-title">Personal Details</h2>
      </div>
      <div className="profile-content">
        <div className="photo-section">
          <div className="photo-container">
            <div className="photo-placeholder">
              <FaCamera size={32} color="#666" />
            </div>
            <button className="change-photo-btn">
              <FaCamera size={16} />
              Change Profile Photo
            </button>
          </div>
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="James" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Bond" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="admin@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+264 81 123 4567" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>National ID</label>
              <input type="text" placeholder="ID Number" />
            </div>
            <div className="form-group">
              <label>Postal Address</label>
              <input type="text" placeholder="P.O. Box" />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Residential Address</label>
            <input type="text" placeholder="Full Address" />
          </div>

          <div className="button-group">
            <button className="edit-button">Edit Details</button>
            <button className="delete-button">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30 days");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
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
      <header className="ah-topbar">
        <div className="dashboard-header-left">
          <h1>Dashboard</h1>
        </div>
        <div className="dashboard-header-right">
          <div className="header-actions">
            <button className="icon-button">
              <BiBell size={24} />
              <span className="notification-badge">3</span>
            </button>
            <button className="icon-button">
              <IoSettingsOutline size={24} />
            </button>
            <button 
              className="profile-button"
              onClick={() => setIsProfileOpen(true)}
            >
              <img 
                src="/api/placeholder/40/40"
                alt="Profile" 
                className="profile-image"
              />
            </button>
          </div>
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
            <ProfilePanel 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </div>
    </div>
  );
};

export default AdminHome;
