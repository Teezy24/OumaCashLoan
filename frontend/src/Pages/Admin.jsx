// Administrator Dashboard Page (React Component)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../Components/AdminSidebar';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch loan applications
    axios.get('/api/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));

    // Fetch clients
    axios.get('/api/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients:', error));

    // Fetch notifications
    axios.get('/api/notifications')
      .then(response => setNotifications(response.data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <div>
        <AdminSidebar />
    <div className="admin-dashboard">
      <header>
        <h1>Administrator Dashboard</h1>
      </header>

      <section className="dashboard-overview">
        <h2>Overview</h2>
        <div className="overview-cards">
          <div className="card">
            <h3>Total Applications</h3>
            <p>{applications.length}</p>
          </div>
          <div className="card">
            <h3>New Applications Today</h3>
            <p>{applications.filter(app => new Date(app.date).toDateString() === new Date().toDateString()).length}</p>
          </div>
        </div>
      </section>

      <section className="loan-applications">
        <h2>Loan Applications</h2>
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Client Name</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.clientName}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{app.status}</td>
                <td>
                  <button onClick={() => handleReview(app.id)}>Review</button>
                  <button onClick={() => handleForward(app.id)}>Forward</button>
                  <button onClick={() => handleReject(app.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map(note => (
            <li key={note.id} className={note.status === 'unread' ? 'unread' : ''}>
              {note.message}
            </li>
          ))}
        </ul>
      </section>

      <section className="client-management">
        <h2>Client Management</h2>
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{new Date(client.registrationDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleView(client.id)}>View Profile</button>
                  <button onClick={() => handleDeactivate(client.id)}>Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
</div>
  );
};

const handleReview = (id) => {
  console.log(`Review application ${id}`);
};

const handleForward = (id) => {
  console.log(`Forward application ${id}`);
};

const handleReject = (id) => {
  console.log(`Reject application ${id}`);
};

const handleView = (id) => {
  console.log(`View client ${id}`);
};

const handleDeactivate = (id) => {
  console.log(`Deactivate client ${id}`);
};

export default AdminDashboard;