import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; // Import AuthContext
import './styles/loginSignUp.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // Get setUser from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error before request

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { email, password },
        { withCredentials: true } // Ensures session cookies are sent
      );

      if (response.data.user) {
        const { role } = response.data.user;
        setUser(response.data.user); // Save user in AuthContext

        // Redirect based on role
        switch (role) {
          case 'admin':
            navigate('/admin-home');
            break;
          case 'client':
            navigate('/client-home');
            break;
          case 'approver':
            navigate('/approver-dashboard');
            break;
          case 'payment_officer':
            navigate('/payment-officer-dashboard');
            break;
          default:
            navigate('/'); // Default to homepage if role is unknown
        }
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Login</h2>
        <p>Welcome back! Please log in.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label>Email</label>
          <div className="auth-input-wrapper">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="auth-input-group">
          <label>Password</label>
          <div className="auth-input-wrapper">
            <FaLock />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {errorMessage && <p className="auth-error">{errorMessage}</p>} {/* Display error message */}

        <button className="auth-submit" type="submit">
          Login
        </button>

        <div className="auth-toggle">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
