import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../CssComponents/Signup.css'; // You'll need to create this file for your styles
import logowebp from '../nsp-logo.png'
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, TextField, CssBaseline } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                <img src={logowebp} alt="NSP Logo" /> {/* Replace with your actual logo */}
            </div>
            <div className="signup-form">
                <input className='input' type="email" placeholder="Email" />
                <input className='input' type="text" placeholder="Firstname" />
                <input className='input' type="text" placeholder="Lastname" />
                <FormControl fullWidth size='small' sx={{ marginBottom: 2 }}>
                    <InputLabel id="gender-select-label" sx={{ fontSize: '14px' }}>Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender"
                        sx={{ backgroundColor: '#fafafa' }}
                    >
                        <MenuItem value={"M"}>Male</MenuItem>
                        <MenuItem value={"F"}>Female</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{
                            textField: {
                                sx: {
                                    '& .MuiInputBase-root': {
                                        height: '40px', // ลดความสูง
                                        width: '400px',
                                        fontSize: '0.9rem', // ลดขนาดตัวอักษรใน Input
                                        marginBottom: '1rem',
                                        backgroundColor: '#fafafa'
                                    },
                                    '& .MuiInputLabel-root': {
                                        fontSize: '0.8rem', // ลดขนาด Label
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
                <input className='input' type="text" placeholder="PhoneNumber" />

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
