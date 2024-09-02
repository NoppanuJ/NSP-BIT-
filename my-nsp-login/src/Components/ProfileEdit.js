import React, { useState } from 'react';
import '../CssComponents/ProfileEdit.css';


const ProfileEdit = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        profilePicture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profilePicture: e.target.files[0],
        });
    };

    const handleSubmit = () => {
        // Handle the save action here (e.g., sending the data to the backend)
    };

    const handleCancel = () => {
        // Handle the cancel action here
    };


    return (
        <div className="profile-edit-container">
            <header className="profile-edit-header">
                <button className="back-button">{'<'}</button>
                <h1>Profile</h1>
            </header>
            <form className="profile-edit-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Sex</label>
                    <input
                        type="text"
                        name="sex"
                        placeholder="Enter your Sex"
                        value={formData.sex}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Enter your Date of Birth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter your Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="button-group">
                    <button type="button" className="button" style={{ backgroundColor: "#4CAF50" }} onClick={handleSubmit}>
                        Save
                    </button>
                    <button type="button" className="button" style={{ backgroundColor: "#dc3545" }} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
