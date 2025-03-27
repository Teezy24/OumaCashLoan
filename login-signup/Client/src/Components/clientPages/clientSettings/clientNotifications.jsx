import React from 'react';

const ClientNotifications = () => {
  return (
    <div className="c-settings__notifications">
      <h2>Notify me when...</h2>
      <div className="c-settings__checkbox-group">
        <label className="c-settings__checkbox">
          <input type="checkbox" />
          <span>Loan payment is due</span>
        </label>
        <label className="c-settings__checkbox">
          <input type="checkbox" />
          <span>Payment is successfully processed</span>
        </label>
        <label className="c-settings__checkbox">
          <input type="checkbox" />
          <span>Loan application status is updated</span>
        </label>
      </div>

      <div className="c-settings__toggle-group">
        <div className="c-settings__toggle-item">
          <div>
            <h3>Mobile Push Notifications</h3>
            <p>Receive push notifications for important loan updates.</p>
          </div>
          <label className="c-settings__toggle">
            <input type="checkbox" defaultChecked />
            <span className="c-settings__toggle-slider"></span>
          </label>
        </div>

        <div className="c-settings__toggle-item">
          <div>
            <h3>Desktop Notifications</h3>
            <p>Get alerts on loan approvals, due dates, and transactions.</p>
          </div>
          <label className="c-settings__toggle">
            <input type="checkbox" defaultChecked />
            <span className="c-settings__toggle-slider"></span>
          </label>
        </div>

        <div className="c-settings__toggle-item">
          <div>
            <h3>Email Notifications</h3>
            <p>Receive email updates about loan activities and account changes.</p>
          </div>
          <label className="c-settings__toggle">
            <input type="checkbox" defaultChecked />
            <span className="c-settings__toggle-slider"></span>
          </label>
        </div>

        <div className="c-settings__toggle-item">
          <div>
            <h3>Chat Notifications</h3>
            <p>Get notified of messages sent to your message box.</p>
          </div>
          <label className="c-settings__toggle">
            <input type="checkbox" defaultChecked />
            <span className="c-settings__toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ClientNotifications;
