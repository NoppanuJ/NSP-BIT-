import React from 'react';
import '../CssComponents/ProfileDisplay.css';
import { useNavigate } from 'react-router-dom';

const ProfileDisplay = () => {
    const navigate = useNavigate();

    const ProfileEdit = () => {
        navigate('/profileedit');
    };
    return (
        <div className="profile-container">
            <header className="profile-header">
                <button className="back-button">{'<'}</button>
                <h1>Profile</h1>
            </header>
            <div className="profile-info">
                <div className="profile-item">
                    <span className="profile-label">Displayed Name</span>
                    <span className="profile-value">John Doe</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">First Name</span>
                    <span className="profile-value">John</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Last Name</span>
                    <span className="profile-value">Doe</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Sex</span>
                    <span className="profile-value">Male</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Date of Birth</span>
                    <span className="profile-value">01/01/1990</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Phone number</span>
                    <span className="profile-value">012-345-6789</span>
                </div>
                <div className="profile-item">
                    <span className="profile-label">Email</span>
                    <span className="profile-value">johndoe@gmail.com</span>
                </div>
            </div>
            <button className="edit-profile-button" onClick={ProfileEdit}>Edit Profile</button>
        </div>
    );
};

export default ProfileDisplay;
