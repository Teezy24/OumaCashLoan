import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/LoginSignup/Navbar.jsx';
import LoginSignup from './Components/pages/LoginSignup.jsx';
import LoanApplication from './Components/pages/LoanApplication.jsx';
import LoanCalculator from './Components/pages/LoanCalculator.jsx';
import LoanHistory from './Components/pages/LoanHistory.jsx';
import Messages from './Components/pages/Messages.jsx';
import Profile from './Components/pages/Profile.jsx';
import About from './Components/pages/About.jsx';
import Logout from './Components/pages/Logout.jsx';
import Home from './Components/pages/home.jsx'; 

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/loan-history" element={<LoanHistory />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;