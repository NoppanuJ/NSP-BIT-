import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';
import Setting from './Components/Setting';
import ProfileDisplay from './Components/ProfileDisplay';
import ProfileEdit from './Components/ProfileEdit';
import ChangePassword from './Components/ChangePassword';
import Notification from './Components/Notification';
import ShiftRequest from './Components/ShiftRequest';
import Schedule from './Components/Schedule';
import Header from './Components/header';
import SideBar from './Components/sideBar';
import AdminMain from './Components/AdminMain';
import AdminAnnouncement from './Components/AdminAnnoucement';
import AdminNotification from './Components/AdminNotification';
import AdminNotification2 from './Components/AdminNotification2';
import AdminCheckPersonnelList from './Components/AdminCheckPersonnelList';
import AdminCreateSchedule from './Components/AdminCreateSchedule';
import AdminResult from './Components/AdminResult';


const App = () => {
    const [bar, setBar] = useState(false);
    const [role, setRole] = useState('');

    return (
        <Router>
            <AppContent setBar={setBar} bar={bar} />
        </Router>
    );
};

const AppContent = ({ setBar, bar }) => {
    const location = useLocation(); // Get the current path

    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/signup' && (
                location.pathname === '/adminmain' || location.pathname === '/admincreateschedule' || location.pathname === '/adminAnnoucement' || location.pathname === '/admincheckpersonnellist' || location.pathname === '/adminnotification' || location.pathname === '/adminnotification2' || location.pathname === '/adminresult' ? (
                    <Header setBar={setBar} bar={bar} role="admin" />
                ) : (
                    <Header setBar={setBar} bar={bar} role="user" />
                )
            )}

            {location.pathname !== '/' && location.pathname !== '/signup' && (
                location.pathname === '/adminmain' || location.pathname === '/admincreateschedule' || location.pathname === '/adminAnnoucement' || location.pathname === '/admincheckpersonnellist' || location.pathname === '/adminnotification' || location.pathname === '/adminnotification2' || location.pathname === '/adminresult' ? (
                    <SideBar bar={bar} setBar={setBar} role="admin" />
                ) : (
                    <SideBar bar={bar} setBar={setBar} role="user"/>
                )
            )}


            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/profiledisplay" element={<ProfileDisplay />} />
                <Route path="/profileedit" element={<ProfileEdit />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/shiftrequest" element={<ShiftRequest />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/adminmain" element={<AdminMain />} />
                <Route path="/adminannoucement" element={<AdminAnnouncement />} />
                <Route path="/adminnotification" element={<AdminNotification />} />
                <Route path="/adminnotification2" element={<AdminNotification2 />} />
                <Route path="/admincheckpersonnellist" element={<AdminCheckPersonnelList />} />
                <Route path="/admincreateschedule" element={<AdminCreateSchedule />} />
                <Route path="/adminresult" element={<AdminResult />} />
            </Routes>
        </>
    );
};

export default App;
