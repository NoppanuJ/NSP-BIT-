import Button from '@mui/material/Button';

import React, { useEffect, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../CssComponents/Login.css'; // You'll need to create this file for your styles
import logowebp from '../nsp-logo.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value); // อัปเดตค่า state
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value); // อัปเดตค่า state
    };
    function base64Encode(str) {
        return btoa(str); // Encode string to Base64
    }
    const signIn = () => {
        const data = {
            email: email,
            password: password
        }

        axios.post('http://localhost:5001/login', data, {
            headers: {
              'Content-Type': 'application/json', // แจ้งว่า request body เป็น JSON
            }
          })
          .then(response => {
            console.log(response.data);

            if(response.data.message === "Login successful"){
                localStorage.setItem("loggedInUser", base64Encode(email));
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
            }
          })
          .catch(error => {
            console.error(error);
          });
          
    };
    const signUp = () => {
        // console.log (username)
        navigate('/signup');
    };

    useEffect(() => {   
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            navigate('/dashboard');
        }
    }, []);
   

    return (
        <div className="login-container">
            <div className="login-logo">
                <img src={logowebp} alt="NSP Logo" /> {/* You can replace this with your logo */}
            </div>
            <div className="login-form">
                <div className="input-group">
                    <FaUser />
                    {/* <input type="text" placeholder="Username" /> */}
                    <input type="text" value={email} onChange={handleChangeEmail} placeholder="Email" />
                </div>
                <div className="input-group">
                    <FaLock />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password} 
                        onChange={handleChangePassword}
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
