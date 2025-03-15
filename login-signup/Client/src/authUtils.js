import api from './axiosConfig';

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
    window.location.href = '/'; // Redirect to login page after logout
  } catch (error) {
    console.error('Error logging out:', error);
  }
};