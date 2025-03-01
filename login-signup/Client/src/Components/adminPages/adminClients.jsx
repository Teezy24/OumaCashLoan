import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../UserContext'; // Import the UserContext
import api from '../../../axiosConfig'; // Import the configured Axios instance

const AdminClients = () => {
  const { user } = useContext(UserContext); // Use the UserContext
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      if (user) {
        try {
          const response = await api.get('/api/users/clients');
          setClients(response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
        }
      }
    };

    fetchClients();
  }, [user]);

  return (
    <div>
      <h2>Admin Clients</h2>
      <ul>
        {clients.map(client => (
          <li key={client.user_id}>
            {client.full_name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminClients;
