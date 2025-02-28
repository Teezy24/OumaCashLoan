import React, { useState, useEffect, useContext } from "react";
import "./adminStyling/adminHome.css";
import { Bell, HelpCircle,ArrowLeft, Camera } from "lucide-react";
import axios from "axios";
import { IoFilterOutline, IoSettingsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiBell } from "react-icons/bi";
import { FaCheckCircle, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { FaComments, FaTimesCircle, FaExclamationTriangle, FaSearch, FaCamera, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from '../../AuthContext';

const ProfilePanel = ({ isOpen, togglePanel, user, setUser }) => {
  const [formData, setFormData] = useState(user || {});

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/user/${user.user_id}`, formData);
      alert(response.data.message);
      setUser(formData);
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details');
    }
  };

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
              <label>Full Name</label>
              <input 
                type="text" 
                name="full_name" 
                value={formData.full_name || ''} 
                onChange={handleChange} 
                className="ch-form-input" 
              />
            </div>
            <div className="ch-form-group">
              <label>National Identification Number</label>
              <input 
                type="text" 
                name="id_number" 
                value={formData.id_number || ''} 
                onChange={handleChange} 
                className="ch-form-input" 
              />
            </div>
          </div>

          <div className="ch-form-row">
            <div className="ch-form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email || ''} 
                onChange={handleChange} 
                className="ch-form-input" 
              />
            </div>
            <div className="ch-form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone_number" 
                value={formData.phone_number || ''} 
                onChange={handleChange} 
                className="ch-form-input" 
              />
            </div>
          </div>

          <div className="ch-form-row">
            <div className="ch-form-group">
              <label>Residential Address</label>
              <input 
                type="text" 
                name="residential_address" 
                value={formData.residential_address || ''} 
                onChange={handleChange} 
                className="ch-form-input" 
              />
            </div>
            <div className="ch-form-group">
              <label>Postal Address</label>
              <input 
                type="text" 
                name="postal_address" 
                value={formData.postal_address || ''} 
                onChange={handleChange} 
                className="ch-form-input" 
              />
            </div>
          </div>

          <div className="ch-button-group">
            <button className="ch-edit-button" onClick={handleSave}>Save Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};


const AdminHome = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30 days");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user && user.user_id) {
          const response = await axios.get(`/api/user/${user.user_id}`);
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [user]);

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

  <div className="ah-container">
    <div className="ah-topbar">
      <div className="ah-topbar-left">
        <h1>Dashboard</h1>
      </div>
      <div className="ah-topbar-right">
        <div className="ah-actions">
          <button className="ah-icon-btn">
            <BiBell size={24} />
            <span className="ah-badge">3</span>
          </button>
          <button className="ah-icon-btn">
            <IoSettingsOutline size={24} />
          </button>
          <HelpCircle className="ah-icon" />
          <div className="ah-user-panel" onClick={togglePanel}>
          
          <div className="ah-avatar" ></div>
          <div className="ah-user-info">
          <span className="ch-user-text">{user ? user.full_name : 'Loading...'}</span>
            <span className="ch-user-welcome">Hello, Welcome Back</span>
          </div>
        </div>
        </div>
        </div>
      </div>
      <ProfilePanel isOpen={isPanelOpen} togglePanel={togglePanel} user={user} setUser={setUser} />

        <div className="ah-dashboard-main">
          <div className="ah-main-content">
            <div className="ah-stats-section">
              <div className="ah-stat-card">
              <div className="ah-period-container">
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
                <div className="ah-stat-container">
                <FaComments className="ah-stat-icon" />
                <h2>12</h2>
                </div>
              </div>
              <div className="ah-stat-card">
              <div className="ah-period-container">
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
                <div className="ah-stat-container">
                <FaComments className="ah-stat-icon" />
                <h2>14</h2>
                </div>
              </div>
              <div className="ah-stat-card">
                <div className="ah-period-container">
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
                <div className="ah-stat-container">
                <FaTimesCircle className="stat-icon" />
                <h2>0</h2>
                </div>
              </div>
              <div className="ah-stat-card">
              <div className="ah-period-container">
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
                
                <div className="ah-stat-container"> 
                             <FaExclamationTriangle className="stat-icon" />
                         <h2>4</h2>
                     </div>
              </div>
            </div>
            <div className="ah-center-container"> 
            <div className="ah-dark-container">
              <div className="ah-timeline-container">
              <div className="ah-dashboard-header-right">
                <h5 className="ah-title">Enter Text</h5>
            <input type="text" placeholder="Enter Text" className="header-input" />
          </div>
                <hr></hr>
                <h2 className="ah-title">Timeline</h2>
                <div className="ah-timeline">
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

        <div className="ah-to-do-list-container">
          <div className="ah-todo-header">
            <h2 className="ah-title">To-do List</h2>
            <div className="ah-todo-actions">
              <button className="ah-todo-action-button" onClick={addTask}>
                +
              </button>
            </div>
          </div>
          <div className="ah-to-do-list">
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="ah-todo-item">
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => handleTaskChange(index, e.target.value)}
                      placeholder={`Task ${index + 1}`}
                      className="ah-todo-input"
                    />
                    <button
                      className="ah-remove-task-button"
                      onClick={() => removeTask(index)}
                    >
                    ✖
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
            <h2 className="ah-title">Borrowers</h2>
            <div className="ah-search-bar">
                <input type="text" placeholder="Search by name or email address" />
                <button>
                  <FaSearch />
                </button>
              </div>

        <div className="ah-borrowers-container-1">
      <div className="ah-header-1">
        <div className="ah-sort-icon-1"><RiArrowDropDownLine size={20} /></div>
        <div className="ah-filter-icon-1"><IoFilterOutline  size={20} /></div>
      </div>
      <table className="ah-borrowers-table-1">
        <thead>
          <tr>
            <th><input type="checkbox" className="ah-checkbox-1" /></th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Loan Request</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td><input type="checkbox" className="ah-checkbox-2" /></td>
              <td>{index + 1}</td>
              <td><a href="#" className="ah-user-link-1">{user.name}</a></td>
              <td><a href="#" className="ah-user-email-1">{user.email}</a></td>
              <td>
                <div className="ah-icon-container-1">
                  <span className="ah-status-1 status-green-1"><FaCheckCircle size={15} /></span>
                  <a href="#" className="ah-action-btn-1 view-btn-1"><FaEye size={15} /></a>
                  <a href="#" className="ah-action-btn-1 edit-btn-1"><FaEdit size={15} /></a>
                  <a href="#" className="ah-action-btn-1 delete-btn-1"><FaTrash size={15} /></a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <div className="ah-pagination-1">
          <button className="ah-pagination-btn pagination-prev">Previous</button>
          <span className="ah-pagination-info">1-7 of 7</span>
          <button className="ah-pagination-btn pagination-next">Next</button>
          </div>
      </div>
    </div>
      </div>
      </div>
    </div>

  </div>
  );
};

export default AdminHome;
