import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import LoginSignup from './Components/pages/LoginSignup.jsx';
import Profile from './Components/pages/Profile.jsx';
import About from './Components/pages/About.jsx';
import Logout from './Components/pages/Logout.jsx';
import Home from './Components/pages/home.jsx';

// Client
import ClientHome from './Components/clientPages/clientHome.jsx';
import ClientLoanApplication from './Components/clientPages/clientLoanApplication.jsx';
import ClientLoanCalculator from './Components/clientPages/clientLoanCalculator.jsx';
import ClientLoanHistory from './Components/clientPages/clientLoanHistory.jsx';
import ClientSidebar from './Components/clientPages/clientSidebar.jsx';

//client messages tabs
import ClientMessages from './Components/clientPages/clientMessages.jsx';
///client settins tabs
import ClientSettings from './Components/clientPages/clientSettings.jsx';


//Admin
import AdminHome from './Components/adminPages/adminHome.jsx';
import AdminLoanApplication from './Components/adminPages/adminLoanApplication.jsx';
import AdminSidebar from './Components/adminPages/adminSidebar.jsx';

//admin messages tabs
import AdminMessages from './Components/adminPages/adminMessages.jsx';
//admin settings tabs
import AdminSettings from './Components/adminPages/settingsTabs/adminSettings.jsx';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
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

        {/* Admin Routes with Static Sidebar */}
        <Route element={<AdminSidebar />}>
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-loan-application" element={<AdminLoanApplication />} />
        <Route path="/admin-messages" element={<AdminMessages />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/logout" element={<Logout />} />
        </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;

