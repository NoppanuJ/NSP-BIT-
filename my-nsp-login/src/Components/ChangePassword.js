import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../CssComponents/ChangePassword.css';


const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = () => {
        // Handle the save action here (e.g., sending the data to the backend)
    };

    

    return (
        <div className="change-password-container">
            <header className="change-password-header">
                <h1>Change Password</h1>
            </header>
            <form className="change-password-form">
                <div className="form-group">
                    <label>Current Password</label>
                    <div className="password-input-group">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Enter your current password"
                        />
                        <span onClick={toggleCurrentPasswordVisibility}>
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <div className="password-input-group">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                        />
                        <span onClick={toggleNewPasswordVisibility}>
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                        />
                        <span onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button type="button" className="save-button" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
