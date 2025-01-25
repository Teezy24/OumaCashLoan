import React, { useState } from 'react';
import './LoginSignUp.css';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser, FaAddressCard, FaPhone } from 'react-icons/fa';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [role, setRole] = useState('client');  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    
    try {
      if (action === 'Sign Up') {
        // Send signup request to the backend
        const response = await axios.post('http://localhost:5000/signup', {
          fullName,
          email,
          password,
          phoneNumber,
          residentialAddress,
          postalAddress,
          role
        });
        alert(response.data); // Response from server
      } else {
        // Send login request to the backend
        const response = await axios.post('http://localhost:5000/login', {
          email,
          password
        });
        alert(response.data); // Response from server
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  

  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>{action}</h2>
        <p>{action === 'Sign Up' ? 'Create an account to get started!' : 'Welcome back! Please log in.'}</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {action === 'Sign Up' && (
          <>
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="auth-input-wrapper">
                <FaUser />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Email</label>
              <div className="auth-input-wrapper">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Residential Address</label>
              <div className="auth-input-wrapper">
                <FaAddressCard />
                <input
                  type="text"
                  placeholder="Enter your residential address"
                  value={residentialAddress}
                  onChange={(e) => setResidentialAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Postal Address</label>
              <div className="auth-input-wrapper">
                <FaAddressCard />
                <input
                  type="text"
                  placeholder="Enter your postal address"
                  value={postalAddress}
                  onChange={(e) => setPostalAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Phone Number</label>
              <div className="auth-input-wrapper">
                <FaPhone />
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Role</label>
              <div className="auth-input-wrapper">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="client">Client</option>
                  <option value="administrator">Administrator</option>
                  <option value="approver">Approver</option>
                  <option value="payment_officer">Payment Officer</option>
                </select>
              </div>
            </div>
          </>
        )}

        <div className="auth-input-group">
          <label>Email</label>
          <div className="auth-input-wrapper">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
        </div>

        {action === 'Sign Up' && (
          <div className="auth-input-group">
            <label>Confirm Password</label>
            <div className="auth-input-wrapper">
              <FaLock />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        )}

        {action === 'Login' && (
          <div className="auth-forgot-password">
            <a href="#">Forgot password?</a>
          </div>
        )}

        <button className="auth-submit" type="submit">
          {action}
        </button>

        <div className="auth-toggle">
          {action === 'Sign Up' ? (
            <p>
              Already have an account?{' '}
              <span onClick={() => setAction('Login')}>Log in</span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span onClick={() => setAction('Sign Up')}>Sign up</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;