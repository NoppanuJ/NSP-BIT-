import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../CssComponents/Signup.css'; // You'll need to create this file for your styles
import logowebp from '../nsp-logo.png'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const signUp = () => {
        navigate('/');

    };


    return (
        <div className="signup-container">
            <div className="signup-logo">
                <img src={logowebp}  alt="NSP Logo" /> {/* Replace with your actual logo */}
            </div>
            <div className="signup-form">
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Username" />
                <div className="password-group">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />
                    <span onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="password-group">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                    />
                    <span onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button className="signup-button" onClick={signUp} >Sign Up</button >
            </div>
        </div>
    );
};

export default Signup;
