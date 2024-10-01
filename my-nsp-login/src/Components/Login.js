import Button from '@mui/material/Button';

import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../CssComponents/Login.css'; // You'll need to create this file for your styles
import logowebp from '../nsp-logo.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChangeUsername = (event) => {
        setUsername(event.target.value); // อัปเดตค่า state
    };


    const signIn = () => {
        console.log (username)
        navigate('/dashboard');
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
    };
    const signUp = () => {
        console.log (username)
        navigate('/signup');
    };
   

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={logowebp} alt="NSP Logo" /> {/* You can replace this with your logo */}
            </div>
            <div className="login-form">
                <div className="input-group">
                    <FaUser />
                    {/* <input type="text" placeholder="Username" /> */}
                    <input type="text" value={username} onChange={handleChangeUsername} placeholder="Username" />
                </div>
                <div className="input-group">
                    <FaLock />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />
                    <span onClick={togglePasswordVisibility}>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                </div>
                <div className="button-group">
                    {/* <button className="sign-in-button">Sign In</button> */}
                    <Button sx={{ width: "45%" }} variant="contained" color="success" onClick={signIn}>
                        Sign In
                    </Button>
                    {/* <button className="cancel-button">Cancel</button> */}
                    <Button sx={{ width: "45%" }} variant="contained" color="primary" onClick={signUp}>
                        Sign Up
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default Login;
