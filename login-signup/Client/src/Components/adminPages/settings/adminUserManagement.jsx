import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../UserContext'; // Import the UserContext
import axios from 'axios'; // Import Axios
import '../adminStyling/adminUserManagement.css'; // Import the CSS file for styling

const AdminUserManagement = () => {
  const { user } = useContext(UserContext); // Use the UserContext
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    phoneNumber: '',
    residentialAddress: '',
    postalAddress: '',
    idNumber: '',
    role: 'client',
    password: '',
    confirmPassword: ''
  });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [confirmation, setConfirmation] = useState({ show: false, message: '', action: null });

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          const response = await axios.get('http://localhost:5000/api/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, [user]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', newUser);
      setUsers([...users, response.data]);
      setNewUser({
        full_name: '',
        email: '',
        phoneNumber: '',
        residentialAddress: '',
        postalAddress: '',
        idNumber: '',
        role: 'client',
        password: '',
        confirmPassword: ''
      });
      setShowAddUserForm(false);
    } catch (error) {
      console.error('Error adding user:', error);
      alert(error.response?.data?.error || 'An error occurred during signup');
    }
  };

  const handleDeleteUser = (userId) => {
    setConfirmation({
      show: true,
      message: 'Are you sure you want to delete this user?',
      action: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/users/${userId}`);
          setUsers(users.filter(user => user.user_id !== userId));
          setConfirmation({ show: false, message: '', action: null });
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    });
  };

  const handleChangeRole = (userId, newRole) => {
    setConfirmation({
      show: true,
      message: `Are you sure you want to change this user's role to ${newRole}?`,
      action: async () => {
        try {
          await axios.put(`http://localhost:5000/api/users/${userId}/role`, { role: newRole });
          setUsers(users.map(user => user.user_id === userId ? { ...user, role: newRole } : user));
          setConfirmation({ show: false, message: '', action: null });
        } catch (error) {
          console.error('Error changing user role:', error);
        }
      }
    });
  };

  return (
    <div className="admin-user-management">
      <h2>User Management</h2>
      <button className="add-user-form-button" onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? 'Cancel' : 'Add User'}
      </button>

      {showAddUserForm && (
        <form className="add-user-form" onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.full_name}
            onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={newUser.phoneNumber}
            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Residential Address"
            value={newUser.residentialAddress}
            onChange={(e) => setNewUser({ ...newUser, residentialAddress: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Postal Address"
            value={newUser.postalAddress}
            onChange={(e) => setNewUser({ ...newUser, postalAddress: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="ID Number"
            value={newUser.idNumber}
            onChange={(e) => setNewUser({ ...newUser, idNumber: e.target.value })}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={newUser.confirmPassword}
            onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
            required
          />
          <button type="submit">Add User</button>
        </form>
      )}

      <div className="user-list">
        {users.map(user => (
          <div key={user.user_id} className="user-card">
            <div className="user-info">
              <h3>{user.full_name}</h3>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => handleChangeRole(user.user_id, user.role === 'admin' ? 'client' : 'admin')}>
                Change Role to {user.role === 'admin' ? 'Client' : 'Admin'}
              </button>
              <button className="delete-button" onClick={() => handleDeleteUser(user.user_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {confirmation.show && (
        <div className="confirmation-modal">
          <p>{confirmation.message}</p>
          <button onClick={confirmation.action}>Confirm</button>
          <button onClick={() => setConfirmation({ show: false, message: '', action: null })}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;