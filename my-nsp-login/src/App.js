import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logowebp from './nsp-logo.png'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Signup from './Components/Signup'
import Setting from './Components/Setting'
import ProfileDisplay from './Components/ProfileDisplay'
import ProfileEdit from './Components/ProfileEdit'
import ChangePassword from './Components/ChangePassword';
import Notification from './Components/Notification';
import ShiftRequest from './Components/ShiftRequest';
import ShiftRequestConfirmation from './Components/ShiftRequestConfirmation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/*Dashboard */}
                <Route path="/signup" element={<Signup />} /> {/*Signup */}
                <Route path="/setting" element={<Setting />} /> {/*Setting */}
                <Route path="/profiledisplay" element={<ProfileDisplay />} /> {/*ProfileDisplay */}
                <Route path="/profileedit" element={<ProfileEdit />} /> {/*ProfileEdit */}
                <Route path="/changepassword" element={<ChangePassword />} /> {/*ChangePassword */}
                <Route path="/notification" element={<Notification />} /> {/*Notification */}
                <Route path="/shiftrequest" element={<ShiftRequest />} /> {/*ShiftRequest */}
                <Route path="/shiftrequestconfirmation" element={<ShiftRequestConfirmation />} /> {/*ShiftRequestConfirmation */}
            </Routes>
        </Router>
        
        // <Login />
        // Hello world/>
    )


};

export default App;
