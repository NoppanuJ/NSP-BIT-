import React, { useEffect, useState } from 'react';
import { Switch, Collapse } from '@mui/material';
import { FaBell, FaLock, FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleDoubleDown } from 'react-icons/fa';
import '../CssComponents/Setting.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Setting = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(true);
  const [selected, setSelected] = useState();
  const [nurseData, setNurseData] = useState([]);

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
        setSelected(response.data.Status);  
    })
}, []);


  const toggleNotificationsOpen = () => {
    setNotificationsOpen(!notificationsOpen);
  };
  const navigate = useNavigate();

  const changePassword = () => {
    navigate('/changepassword');
  };

  const handleToggle = (option) => {
    console.log(option);
    if (selected === option) {
      return;
    }
    axios.post("http://localhost:5001/editStatus", {
      email: nurseData.User_Email,
      status: option
    })
    .then(res => {
        console.log(res);
        setSelected(res.data.Status);
        
    })
    .catch(err => {
        console.log(err);
    });

  };


  return (
    <div className="setting-container">
      <h1>Setting</h1>

      {/* Notifications Section */}
      <div className="setting-section">
        <div className="setting-header" onClick={toggleNotificationsOpen}>
          <div className="settings-header-title">
            {/* <FaBell /> */}
            <span>Status</span>
          </div>
          <FaAngleDown className={`toggle-icon ${notificationsOpen ? 'open' : ''}`} />
        </div>
        <Collapse in={notificationsOpen}>
          <div className="notification-options">
            <div className="notification-item">
              <span>Active</span>
              <Switch
                checked={selected === "Active"}
                onChange={() => handleToggle("Active")}
              />
            </div>
            <div className="notification-item">
              <span>Inactive</span>
              <Switch
                checked={selected === "Inactive"}
                onChange={() => handleToggle("Inactive")}
              />
            </div>
            <div className="notification-item">
              <span>Sick</span>
              <Switch
                checked={selected === "Sick"}
                onChange={() => handleToggle("Sick")}
              />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Change Password Section */}
      <div className="setting-section">
        <div className="setting-header">
          <div className="setting-header-title">
            {/* <FaLock /> */}
            <span>Change Password</span>
          </div>
          <FaAngleRight className="toggle-icon" onClick={changePassword} />
        </div>
      </div>
    </div>
  );
};

export default Setting;
