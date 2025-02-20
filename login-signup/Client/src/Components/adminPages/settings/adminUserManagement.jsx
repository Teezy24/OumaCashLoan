import React, { useState } from 'react';
import { FaUserPlus, FaTrashAlt } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { name: "Jammy Tackius", dateAdded: "May 02, 2022", lastActive: "Feb 24, 2025", role: "Administrator" },
    { name: "Moses Unokhua", dateAdded: "May 07, 2022", lastActive: "Feb 24, 2025", role: "Administrator" },
    { name: "Natangwe Reinhold", dateAdded: "May 22, 2022", lastActive: "Feb 24, 2025", role: "Administrator" },
    { name: "Jane Ruward", dateAdded: "Jan 19, 2024", lastActive: "Feb 24, 2025", role: "Standard User" },
  ]);

  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole;
    setUsers(updatedUsers);
  };

  return (
    <div className="white-container large">
      <div className="user-management-header">
        <h2>User Management</h2>
        <p>Manage users, roles, and permissions.</p>
        <button className="add-user-button">
          <FaUserPlus /> ADD USER
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Added</th>
            <th>Last Active</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.dateAdded}</td>
              <td>{user.lastActive}</td>
              <td>
                <select 
                  className="custom-select" 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                > 
                  <option value="Administrator">Administrator</option>
                  <option value="Standard User">Standard User</option>
                </select>
              </td>
              <td>
                <button className="delete-button">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
