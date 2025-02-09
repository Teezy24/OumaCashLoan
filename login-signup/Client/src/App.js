import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/pages/LoginSignup.jsx';
import LoanApplication from './Components/pages/LoanApplication.jsx';
import LoanCalculator from './Components/pages/LoanCalculator.jsx';
import LoanHistory from './Components/pages/LoanHistory.jsx';
import Messages from './Components/pages/Messages.jsx';
import Profile from './Components/pages/Profile.jsx';
import About from './Components/pages/About.jsx';
import Logout from './Components/pages/Logout.jsx';
import Home from './Components/pages/home.jsx';

// Client
import ClientHome from './Components/clientPages/clientHome.jsx';
import ClientLoanApplication from './Components/clientPages/clientLoanApplication.jsx';
import ClientLoanCalculator from './Components/clientPages/clientLoanCalculator.jsx';
import ClientLoanHistory from './Components/clientPages/clientLoanHistory.jsx';
import ClientMessages from './Components/clientPages/clientMessages.jsx';
import ClientSettings from './Components/clientPages/clientSettings.jsx';
import ClientSidebar from './Components/clientPages/clientSidebar.jsx';
// import Logout from './Components/pages/Logout.jsx';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/loan-history" element={<LoanHistory />} />
        <Route path="/messages" element={<Messages />} />
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
      </Routes>
    </div>
  );
}

export default App;

