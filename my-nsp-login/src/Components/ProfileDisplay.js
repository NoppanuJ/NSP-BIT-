import React, { useState } from 'react';
import { Avatar, Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import '../CssComponents/ProfileDisplay.css';

const ProfileDisplay = () => {
  const [profile, setProfile] = useState({
    displayedName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    sex: 'Male',
    dateOfBirth: '01/01/2000',
    phoneNumber: '0123456789',
    email: 'johndoe@gmail.com',
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleEditProfile = () => {
    console.log('Navigate to Edit Profile');
    // Logic to navigate to the edit profile page
  };

  return (
    <div className="profile-display-container">
      <div className="profile-picture">
        <Avatar src={profileImage} sx={{ width: 100, height: 100 }} />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleProfileImageChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </div>

      <div className="profile-info">
        <div className="profile-row">
          <span>Displayed Name</span>
          <span>{profile.displayedName}</span>
        </div>
        <div className="profile-row">
          <span>First Name</span>
          <span>{profile.firstName}</span>
        </div>
        <div className="profile-row">
          <span>Last Name</span>
          <span>{profile.lastName}</span>
        </div>
        <div className="profile-row">
          <span>Sex</span>
          <span>{profile.sex}</span>
        </div>
        <div className="profile-row">
          <span>Date of Birth</span>
          <span>{profile.dateOfBirth}</span>
        </div>
        <div className="profile-row">
          <span>Phone number</span>
          <span>{profile.phoneNumber}</span>
        </div>
        <div className="profile-row">
          <span>Email</span>
          <span>{profile.email}</span>
        </div>
      </div>
      
      <Button variant="contained" color="primary" className="edit-button" onClick={handleEditProfile}>
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileDisplay;
