import React, { useState } from 'react';
import { Switch, Collapse } from '@mui/material';
import { FaBell, FaLock, FaAngleDown } from 'react-icons/fa';
import '../CssComponents/Setting.css';

const Setting = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(true);
  const [shiftChanges, setShiftChanges] = useState(true);
  const [alerts, setAlerts] = useState(false);
  const [messages, setMessages] = useState(false);

  const toggleNotificationsOpen = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <div className="setting-container">
      <h1>Setting</h1>

      {/* Notifications Section */}
      <div className="setting-section">
        <div className="setting-header" onClick={toggleNotificationsOpen}>
          <div className="setting-header-title">
            <FaBell />
            <span>Notifications</span>
          </div>
          <FaAngleDown className={`toggle-icon ${notificationsOpen ? 'open' : ''}`} />
        </div>
        <Collapse in={notificationsOpen}>
          <div className="notification-options">
            <div className="notification-item">
              <span>Shift Changes</span>
              <Switch
                checked={shiftChanges}
                onChange={() => setShiftChanges(!shiftChanges)}
              />
            </div>
            <div className="notification-item">
              <span>Alerts</span>
              <Switch
                checked={alerts}
                onChange={() => setAlerts(!alerts)}
              />
            </div>
            <div className="notification-item">
              <span>Messages</span>
              <Switch
                checked={messages}
                onChange={() => setMessages(!messages)}
              />
            </div>
          </div>
        </Collapse>
      </div>

      {/* Change Password Section */}
      <div className="setting-section">
        <div className="setting-header">
          <div className="setting-header-title">
            <FaLock />
            <span>Change Password</span>
          </div>
          <FaAngleDown className="toggle-icon" />
        </div>
      </div>
    </div>
  );
};

export default Setting;
