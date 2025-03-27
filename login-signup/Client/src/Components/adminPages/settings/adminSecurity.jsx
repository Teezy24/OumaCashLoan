import React from 'react';
import { FaLock, FaUserShield, FaShieldAlt } from "react-icons/fa";
import '../adminStyling/adminSecurity.css';

const AdminSecurity = () => {
  return (
    <div className="security-page">
      <div className="as-sidebar"> 
              <h1 className="heading">Security Settings</h1>
      </div>
      <div className="security-content">
        <div className="security-content__item">
          <h1>Page Under Maintanance</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;