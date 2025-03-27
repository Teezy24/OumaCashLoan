import React, { useState } from 'react';
import { Eye, EyeOff, Smartphone, Laptop } from 'lucide-react';

const ClientSecurity = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="c-settings__security">
      <div className="c-settings__security-section">
        <h2>Password</h2>
        <p>Set a password to protect your account and evaluate its strength.</p>
        <div className="c-settings__password-field">
          <div className="c-settings__password-input">
            <input type={showPassword ? 'text' : 'password'} value="••••••••••••" readOnly />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="c-settings__password-strength">
            <span className="c-settings__strength-indicator">Very secure</span>
          </div>
          <button className="c-settings__change-btn">CHANGE</button>
        </div>
      </div>

      <div className="c-settings__security-section">
        <h2>Two-step verification</h2>
        <p>Add a second method of verification such as a security key or code in addition to your password.</p>
        <div className="c-settings__2fa">
          <select className="c-settings__2fa-select">
            <option>Verification Code</option>
          </select>
          <label className="c-settings__toggle">
            <input type="checkbox" />
            <span className="c-settings__toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="c-settings__security-section">
        <h2>Linked Devices</h2>
        <p>Manage linked devices.</p>
        <div className="c-settings__devices">
          <table className="c-settings__devices-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="c-settings__device-info">
                    <Smartphone size={20} />
                    <span>Samsung A05</span>
                  </div>
                </td>
                <td><span className="c-settings__status c-settings__status--active">Active</span></td>
                <td><button className="c-settings__remove-btn">REMOVE</button></td>
              </tr>
              <tr>
                <td>
                  <div className="c-settings__device-info">
                    <Smartphone size={20} />
                    <span>iPhone 14 Pro</span>
                  </div>
                </td>
                <td><span className="c-settings__status">Offline</span></td>
                <td><button className="c-settings__remove-btn">REMOVE</button></td>
              </tr>
              <tr>
                <td>
                  <div className="c-settings__device-info">
                    <Laptop size={20} />
                    <span>Dell Inspiron 14 Plus</span>
                  </div>
                </td>
                <td><span className="c-settings__status">Offline</span></td>
                <td><button className="c-settings__remove-btn">REMOVE</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientSecurity;
