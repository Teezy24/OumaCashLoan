import React, { useState } from 'react';
import axios from 'axios';
import { 
    FaEnvelope, 
    FaLock, 
    FaUser, 
    FaPhone, 
    FaAddressCard, 
    FaShieldAlt 
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './styles/loginSignUp.css';

const SignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        residentialAddress: '',
        postalAddress: '',
        idNumber: '',
        role: 'client',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log('Signup successful:', response.data);
            
            // Navigate based on role
            switch(formData.role) {
                case 'administrator':
                    navigate('/admin-home');
                    break;
                case 'approver':
                    navigate('/approver-dashboard');
                    break;
                case 'payment_officer':
                    navigate('/payment-officer-dashboard');
                    break;
                default:
                    navigate('/client-home');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert(error.response?.data?.error || 'An error occurred during signup');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2>Sign Up</h2>
                <p>Create an account to get started!</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-input-group">
                    <label>Full Name</label>
                    <div className="auth-input-wrapper">
                        <FaUser />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Email</label>
                    <div className="auth-input-wrapper">
                        <FaEnvelope />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Phone Number</label>
                    <div className="auth-input-wrapper">
                        <FaPhone />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Residential Address</label>
                    <div className="auth-input-wrapper">
                        <FaAddressCard />
                        <input
                            type="text"
                            name="residentialAddress"
                            placeholder="Enter your residential address"
                            value={formData.residentialAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Postal Address</label>
                    <div className="auth-input-wrapper">
                        <FaAddressCard />
                        <input
                            type="text"
                            name="postalAddress"
                            placeholder="Enter your postal address"
                            value={formData.postalAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>ID Number</label>
                    <div className="auth-input-wrapper">
                        <FaUser />
                        <input
                            type="text"
                            name="idNumber"
                            placeholder="Enter your ID number"
                            value={formData.idNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Account Type</label>
                    <div className="auth-input-wrapper">
                        <FaShieldAlt />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="role-select"
                            required
                        >
                            <option value="client">Client</option>
                            <option value="administrator">Administrator</option>
                            <option value="approver">Loan Approver</option>
                            <option value="payment_officer">Payment Officer</option>
                        </select>
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Password</label>
                    <div className="auth-input-wrapper">
                        <FaLock />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label>Confirm Password</label>
                    <div className="auth-input-wrapper">
                        <FaLock />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>
                </div>

                <button type="submit" className="auth-submit">
                    Sign Up
                </button>

                <div className="auth-toggle">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;