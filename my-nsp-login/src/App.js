import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

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
import axios from 'axios';

const App = () => {
    const [bar, setBar] = useState(false);

    return (
        <Router>
            <AppContent setBar={setBar} bar={bar} />
        </Router>
    );
};

const base64Decode = (encodedString) => {
    const decodedString = atob(encodedString);
    return decodedString;
};

const AppContent = ({ setBar, bar }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [nurseData, setNurseData] = useState([]);
    const [userRole, setUserRole] = useState(null);

    const roleMapping = {
        "/dashboard": "user",
        "/setting": "user",
        "/profiledisplay": "user",
        "/profileedit": "user",
        "/changepassword": "user",
        "/notification": "user",
        "/shiftrequest": "user",
        "/schedule": "user",
        "/adminmain": "admin",
        "/adminannoucement": "admin",
        "/adminnotification": "admin",
        "/adminnotification2": "admin",
        "/admincheckpersonnellist": "admin",
        "/admincreateschedule": "admin",
        "/adminresult": "admin",
    };

    useEffect(() => {
        const storedEncodedEmail = localStorage.getItem("loggedInUser");

        if (!storedEncodedEmail) {
            console.warn("No loggedInUser found in localStorage. Redirecting to login page...");
            setUserRole(null);
            if (location.pathname !== '/' && location.pathname !== '/signup') {
               navigate("/");
            }
            return;
        }

        try {
            const decodedEmail = base64Decode(storedEncodedEmail);

            axios.get(`http://localhost:5001/getNurseByEmail/${decodedEmail}`)
                .then((response) => {
                    setNurseData(response.data);
                    const role = response.data?.Role || "user"; // Default to "user" if no role is provided
                    setUserRole(role);
                })
                .catch((error) => {
                    console.error("Error fetching nurse data:", error);
                    navigate("/");
                });
        } catch (error) {
            console.error("Error decoding email:", error);
            navigate("/");
        }
    }, [roleMapping]);

    useEffect(() => {
        const requiredRole = roleMapping[location.pathname];
        if (userRole && requiredRole && userRole !== requiredRole) {
            if (userRole === "user") {
                navigate("/dashboard");
            } else if (userRole === "admin") {
                navigate("/adminmain");
            }
        }
    }, [userRole, location.pathname, navigate]);

    return (
        <>
            {location.pathname !== '/' && location.pathname !== '/signup' && (
                <Header setBar={setBar} bar={bar} role={userRole} pathname={location.pathname} />
            )}

            {location.pathname !== '/' && location.pathname !== '/signup' && (
                <SideBar bar={bar} setBar={setBar} role={userRole} pathname={location.pathname} />
            )}
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/profiledisplay" element={<ProfileDisplay />} />
                <Route path="/profileedit" element={<ProfileEdit />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/shiftrequest" element={<ShiftRequest />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/adminmain" element={<AdminMain/>} />
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
