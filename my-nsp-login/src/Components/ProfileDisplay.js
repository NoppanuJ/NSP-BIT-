import React, { useState, useEffect } from 'react';
import { Avatar, Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import '../CssComponents/ProfileDisplay.css';
import { useNavigate } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import axios from 'axios';
import moment from "moment";

const ProfileDisplay = () => {
  // const [profile, setProfile] = useState({
  //   displayedName: 'John Doe',
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   sex: 'Male',
  //   dateOfBirth: '01/01/2000',
  //   phoneNumber: '0123456789',
  //   email: 'johndoe@gmail.com',
  // });

  const [profileImage, setProfileImage] = useState(null);
  const [nurseData, setNurseData] = useState({});
  const base64Decode = (base64String) => {
    const decodedString = atob(base64String);
    return decodedString;
  }

  useEffect(() => {
      const storedEncodedEmail = localStorage.getItem("loggedInUser");
      const decodedEmail = base64Decode(storedEncodedEmail);
      console.log(decodedEmail);
      axios.get(`http://localhost:5001/getNurseByEmail/${decodedEmail}`).then((response) => {
          console.log(response.data);
          setNurseData(response.data);
      })
  }, []);

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // const handleEditProfile = () => {
  //   console.log('Navigate to Edit Profile');
  //   // Logic to navigate to the edit profile page
  // };
  const navigate = useNavigate();
    
  const EditProfile = () => {       
      const data ={
          Nurse_ID: nurseData.Nurse_ID,
          User_First_Name: nurseData.User_First_Name,
          User_Last_Name: nurseData.User_Last_Name,
          Sex: nurseData.Sex,
          Date_of_Birth: nurseData.Date_of_Birth,
          User_Phone_Number: nurseData.Phone_Number,
          User_Email: nurseData.User_Email
      }
      navigate('/profileedit', { state: data });
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
          <span>ID Number</span>
          <span>{nurseData.Nurse_ID}</span>
        </div>
        <div className="profile-row">
          <span>First Name</span>
          <span>{nurseData.User_First_Name}</span>
        </div>
        <div className="profile-row">
          <span>Last Name</span>
          <span>{nurseData.User_Last_Name}</span>
        </div>
        <div className="profile-row">
          <span>Sex</span>
          <span>{nurseData.Sex === 'M' ? 'Male' : 'Female'}</span>
        </div>
        <div className="profile-row">
          <span>Date of Birth</span>
          <span>{moment(nurseData.Date_of_Birth).format('DD/MM/YYYY')}</span>
        </div>
        <div className="profile-row">
          <span>Phone number</span>
          <span>{nurseData.Phone_Number}</span>
        </div>
        <div className="profile-row">
          <span>Email</span>
          <span>{nurseData.User_Email}</span>
        </div>
      </div>
      
      <Button variant="contained" color="primary" className="edit-button" onClick={EditProfile}>
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileDisplay;
