import React from "react";
import "./profile.css"; // Link to the CSS file

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-photo"
          />
          <button className="change-photo">Change Profile Photo</button>
        </div>
        <div className="profile-name">
          <h2>Firstname Surname</h2>
        </div>
      </div>

      <div className="profile-details">
        <div className="personal-details">
          <h3>Personal Details</h3>
          <form>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" defaultValue="James" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" defaultValue="Bond" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue="spyman@gmail.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" defaultValue="+264 81 243 7748" />
            </div>
            <div className="form-group">
              <label>National Identification Number</label>
              <input type="text" defaultValue="20111133007" />
            </div>
            <div className="form-group">
              <label>Postal Address</label>
              <input type="text" defaultValue="P. O. Box 007 Windhoek" />
            </div>
            <div className="form-group">
              <label>Residential Address</label>
              <input
                type="text"
                defaultValue="House No. 45, Wambo Street Kleine Kuppe Windhoek, Namibia 9000"
              />
            </div>
          </form>
        </div>

        <div className="banking-details">
          <h3>Banking Details</h3>
          <form>
            <div className="form-group">
              <label>Bank Name</label>
              <input type="text" defaultValue="Bank Windhoek" />
            </div>
            <div className="form-group">
              <label>Bank Account Number</label>
              <input type="text" defaultValue="81520945312" />
            </div>
          </form>
        </div>
      </div>

      <div className="profile-actions">
        <button className="edit-details">Edit Details</button>
        <button className="delete-account">Delete Account</button>
      </div>
    </div>
  );
}

export default Profile;
