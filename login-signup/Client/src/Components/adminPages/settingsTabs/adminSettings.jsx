import React from 'react'
import {  FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaLock,FaUserPlus,FaTrashAlt,FaUser, FaCreditCard, FaFileInvoiceDollar} from "react-icons/fa";
import "../adminStyling/adminSettings.css"

const AdminSettings = () => {

    const users = [
        { name: "Jammy Tackius", dateAdded: "May 02, 2022", lastActive: "Feb 24, 2025", role: "Administrator" },
        { name: "Moses Unokhua", dateAdded: "May 07, 2022", lastActive: "Feb 24, 2025", role: "Administrator" },
        { name: "Natangwe Reinhold", dateAdded: "May 22, 2022", lastActive: "Feb 24, 2025", role: "Administrator" },
        { name: "Jane Ruward", dateAdded: "Jan 19, 2024", lastActive: "Feb 24, 2025", role: "Standard User" },
      ];

  return (
    <div className="wrapper-1">
         <div className="container-2">
         <div className="first-sidebar">
      <div className="white-container small">
        <div className="setting-item">
          <FaUser className="sidebar1-icon" />
          <span className="sidebar1-item-text">User and Access Management</span>
          <div className="sidebar1-item-description">Manage users and roles</div>
        </div>
        <div className="setting-item">
          <FaFileInvoiceDollar className="sidebar1-icon" />
          <span className="sidebar1-item-text">Loan Settings</span>
          <div className="sidebar1-item-description">Adjust loan terms and rates.</div>
        </div>
        <div className="setting-item">
          <FaCreditCard className="sidebar1-icon" />
          <span className="sidebar1-item-text">Payments</span>
          <div className="sidebar1-item-description">Track and configure transactions.</div>
        </div>
        <div className="setting-item">
          <FaLock className="sidebar1-icon" />
          <span className="sidebar1-item-text">Security</span>
          <div className="sidebar1-item-description">Set up authentication and access.</div>
        </div>
      </div>
    </div>
    
            <div className="user-management">
            <div className="white-container large">
            <div className="user-management-header">
            <div className="user-management-title">User Management</div>
            <div className="user-management-description">
              Invite, manage, and collaborate with team members. <br />
              Set roles and permissions for secure access. <br />
              Monitor user activity and track system interactions.
            </div>
            <button className="add-user-button">
              <FaUserPlus /> ADD USER
            </button>
          </div>

          <table className="user-table" id="administrators">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date Added</th>
                <th>Last Active</th>
                <th></th>
                <th></th> 
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img src="../assets/2.png" alt="Avatar" className="avatar" /> 
                    {user.name}
                  </td>
                  <td>{user.dateAdded}</td>
                  <td>{user.lastActive}</td>
                  <td>
                    <select className="custom-select" value={user.role}> 
                      <option value="Administrator">Administrator</option>
                      <option value="Standard User">Standard User</option>
                    </select>
                  </td>
                  <td>
                    <button className="delete-button"> {/* Delete button */}
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            </div>
         </div>
         </div>
  )
}

export default AdminSettings;