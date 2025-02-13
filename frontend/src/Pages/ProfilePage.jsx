import React, { useState, useEffect } from "react";
import '../css/ProfilePage.css'
import axios from "axios";
import Sidebar from "../Components/clientSidebar";


    const ProfilePage = () => {
        const [profile, setProfile] = useState({
            fullname: "",
            phone: "",
            email: "",
            postal_address: "",
            national_id: "",
            residential_address:"",
            bank_name: "",
            bank_account_number: "",
            profile_photo: "",
        });
    
        const [editMode, setEditMode] = useState(false);
        const [selectedFile, setSelectedFile] = useState(null);
        const userId = 1; // Change this to the actual logged-in user ID
    
        // Fetch profile data on component mount
        useEffect(() => {
            axios.get(`http://localhost:3002/profile/${userId}`)
                .then(response => {
                    setProfile(response.data);
                })
                .catch(error => {
                    console.error("Error fetching profile:", error);
                });
        }, [userId]);
    
        // Handle input changes
        const handleChange = (e) => {
            setProfile({ ...profile, [e.target.name]: e.target.value });
        };
    
        // Handle profile update
        const handleUpdate = (e) => {
            e.preventDefault();
            axios.put(`http://localhost:3002/profile/${userId}`, profile)
                .then(response => {
                    alert("Profile updated successfully!");
                    setEditMode(false);
                })
                .catch(error => {
                    console.error("Error updating profile:", error);
                    alert("Failed to update profile.");
                });
        };
    
        // Handle profile picture upload
        const handleFileChange = (e) => {
            setSelectedFile(e.target.files[0]);
        };
    
        const handleUpload = () => {
            if (!selectedFile) {
                alert("Please select an image first!");
                return;
            }
    
            const formData = new FormData();
            formData.append("profilePhoto", selectedFile);
    
            axios.post(`http://localhost:3002/profile/upload/${userId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
                alert("Profile picture uploaded successfully!");
                setProfile({ ...profile, profile_photo: response.data.profilePhoto });
            })
            .catch(error => {
                console.error("Error uploading profile picture:", error);
                alert("Failed to upload profile picture.");
            });
        };


    return (
        <div >
            <Sidebar />
            <div className='ProfilePage-container'>
                <div className="ProfilePage-container-header">
                    <img src={`http://localhost:3002/${profile.profile_photo}`} alt="profileimage" />
                    <h1 > {profile.Fullname} </h1>
                </div>
                <div className="ProfilePage-form-container">
                    <div className="profile-manage-container">
                        <div>
                            <p>profilePhoto</p>
                        </div>
                        <div className="profile-pic">
                            <img src={`http://localhost:3002/${profile.profile_photo}`} alt="profile-pic" />

                        </div>
                        <div className="prf-button-container">
                            <button onClick={handleUpload}>change profile picture</button>
                        </div>
                        <div className="prf-manage-button-container">
                            <button className="Editbtn" onClick={() => setEditMode(!editMode)}>{editMode ? 'cancel': "Edit Details"}</button>
                            <button className="deletebtn">Delete Details</button>
                        </div>
                    </div>
                    <div className='prf-form-container'>
                        <div className='prf-form-container-header'>
                            <p>Personal Details</p>

                        </div>
                        <form className="prf-form-personalDetails">

                            <div className="Fullname-PhoneNo-input">
                                <div className='Fullname-input'>
                                    <label htmlFor="fullname">Fullname</label>
                                    <input type="text" name="fullname" id="Fullname" value={profile.Fullname} onChange={handleChange} disabled = {!editMode} />
                                </div>
                                <div className='PhoneNo-input'>
                                    <label htmlFor="PhoneNo">Phone</label>
                                    <input type="number" name="fullname" id="Fullname" value={profile.phoneNumber} onChange={handleChange} disabled = {!editMode} />
                                </div>
                            </div>

                            <div className="Email-Postal-input">
                                <div className='Email-input'>
                                    <label htmlFor="fullname">Email</label>
                                    <input type="text" name="email" id="Fullname" value={profile.email} onChange={handleChange} disabled={!editMode} />
                                </div>
                                <div className='Postal-input'>
                                    <label htmlFor="PhoneNo">Postal Address</label>
                                    <input type="number" name="postal" id="Fullname" value={profile.Postal} onChange={handleChange} disabled={!editMode} />
                                </div>
                            </div>

                            <div className="IDNo-Residential-input">
                                <div className='IDNo-input'>
                                    <label htmlFor="fullname">National Identification Number</label>
                                    <input type="number" name="ID" id="Fullname" value={profile.ID_Number} onChange={handleChange} disabled={!editMode} />
                                </div>
                                <div className='Residential-input'>
                                    <label htmlFor="PhoneNo">Residential Adress</label>
                                    <input type="text" name="Resident" id="Fullname" value={profile.Residential} onChange={handleChange} disabled={!editMode} />
                                </div>
                            </div>
                            <p>Bank Details</p>
                            <div className="IDNo-Residential-input">
                                <div className='BankName-input'>
                                    <label htmlFor="fullname">Bank Name</label>
                                    <input type="text" name="BankName" id="Fullname" value={profile.Bank_name} onChange={handleChange} disabled={!editMode} />
                                </div>
                                <div className='Residential-input'>
                                    <label htmlFor="PhoneNo">Bank Account Number</label>
                                    <input type="number" name="BankAcc" id="Fullname" value={profile.Bank_account_no} onChange={handleChange} disabled={!editMode} />
                                </div>
                            </div>
                            {editMode && <button type = 'submit' className = 'Savebtn' onClick={handleUpdate}> Save Changes</button>}
                            
                        </form>


                    </div>

                </div>

            </div>

        </div>
    )
}
export default ProfilePage