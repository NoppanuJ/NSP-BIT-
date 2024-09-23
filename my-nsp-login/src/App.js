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
import ShiftRequestConfirmation from './Components/ShiftRequestConfirmation';
import Schedule from './Components/Schedule';
import Header from './Components/header';
import SideBar from './Components/sideBar';
import AdminMain from './Components/AdminMain';

const App = () => {
    const [bar, setBar] = useState(false);

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
            {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/adminmain' && <Header setBar={setBar} bar={bar} />}
            {location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/adminmain' &&<SideBar bar={bar} setBar={setBar} />}


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
                <Route path="/shiftrequestconfirmation" element={<ShiftRequestConfirmation />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/adminmain" element={<AdminMain />} />
            </Routes>
        </>
    );
};

export default App;
