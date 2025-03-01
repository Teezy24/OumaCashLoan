import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { UserProvider } from './UserContext.js'; // Import the UserProvider

import LoginSignup from './Components/pages/login.jsx';
import SignUpForm from './Components/pages/signup.jsx';
import Profile from './Components/pages/Profile.jsx';
import About from './Components/pages/About.jsx';
import Logout from './Components/pages/Logout.jsx';
import Home from './Components/pages/home.jsx';

// Client
import ClientHome from './Components/clientPages/clientHome.jsx';
import ClientLoanApplication from './Components/clientPages/loanApplication/clientLoanApplication.jsx';
import ClientLoanCalculator from './Components/clientPages/clientLoanCalculator.jsx';
import ClientLoanHistory from './Components/clientPages/clientLoanHistory.jsx';
import ClientSidebar from './Components/clientPages/clientSidebar.jsx';
import ClientMessages from './Components/clientPages/clientMessages.jsx';
import ClientSettings from './Components/clientPages/clientSettings.jsx';

// Admin
import AdminHome from './Components/adminPages/adminHome.jsx';
import AdminLoanReviews from './Components/adminPages/adminLoanReviews.jsx';
import AdminAnalytics from './Components/adminPages/adminAnalytics.jsx';
import AdminSidebar from './Components/adminPages/adminSidebar.jsx';
import AdminMessages from './Components/adminPages/adminMessages.jsx';
import AdminSettings from './Components/adminPages/settings/adminSettings.jsx';

function App() {
  return (
    <UserProvider> {/* Wrap the application with UserProvider */}
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
            
            {/* Client Routes with Static Sidebar */}
            <Route element={<ClientSidebar />}>
              <Route path="/client-home" element={<ClientHome />} />
              <Route path="/client-loan-application" element={<ClientLoanApplication />} />
              <Route path="/client-loan-calculator" element={<ClientLoanCalculator />} />
              <Route path="/client-loan-history" element={<ClientLoanHistory />} />
              <Route path="/client-messages" element={<ClientMessages />} />
              <Route path="/client-settings" element={<ClientSettings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            {/* Admin Routes with Static Sidebar */}
            <Route element={<AdminSidebar />}>
              <Route path="/admin-home" element={<AdminHome />} />
              <Route path="/admin-loan-reviews" element={<AdminLoanReviews />} />
              <Route path="/admin-analytics" element={<AdminAnalytics />} />
              <Route path="/admin-messages" element={<AdminMessages />} />
              <Route path="/admin-settings" element={<AdminSettings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

