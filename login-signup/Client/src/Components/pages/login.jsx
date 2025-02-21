import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './styles/loginSignUp.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      if (response.data.user) {
        const { role } = response.data.user; 

        if (role === 'administrator') {
          navigate('/admin-home');
        } else if (role === 'client') {
          navigate('/client-home'); 
        } else if (role === 'approver') {
          navigate('/approver-dashboard');
        } else if (role === 'payment_officer') {
          navigate('/payment-officer-dashboard');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      // Show server error
      alert('Something went wrong: ' + (err.response?.data?.error || 'Unknown error'));
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