import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../CssComponents/Signup.css'; // Your CSS
import logowebp from '../nsp-logo.png';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const signUp = (values) => {
        const data = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            dateOfBirth: values.dateOfBirth,
            phoneNumber: values.phoneNumber,
        };

        axios.post('http://localhost:5001/signup', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if(response.data.message === "User created successfully.") {
                Swal.fire({
                    icon: "success",
                    title: "Login Successful",
                    text: response.data.message,
                });
                navigate('/');
            }
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || error.message,
            });
        });
    };

    return (
        <div className="signup-container">
            <div className="signup-logo">
                <img src={logowebp} alt="NSP Logo" />
            </div>
            <div className="signup-form">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        firstName: '',
                        lastName: '',
                        gender: '',
                        dateOfBirth: '',
                        phoneNumber: '',
                    }}
                    validationSchema={validationSchema}
                    validateOnMount= {false}
                    onSubmit={signUp}
                >
                    {({ values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
                        <Form>
                            <Field
                                className={ errors.email && touched.email ? 'input-error' : 'input'}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="email" component="div" className="error-text"/>

                            <Field
                                className={ errors.firstName && touched.firstName ? 'input-error' : 'input'}
                                type="text"
                                name="firstName"
                                placeholder="Firstname"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="firstName" component="div" className="error-text" />

                            <Field
                                className={ errors.lastName && touched.lastName ? 'input-error' : 'input'}
                                type="text"
                                name="lastName"
                                placeholder="Lastname"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="lastName" component="div" className="error-text" />

                            <FormControl fullWidth size='small' sx={{ marginBottom: errors.gender && touched.gender ? '0' : '1rem' }}>
                                <InputLabel id="gender-select-label" sx={{ fontSize: '14px' }}>Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Gender"
                                    value={values.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="gender"
                                    error={errors.gender && touched.gender}
                                >
                                    <MenuItem value={"M"}>Male</MenuItem>
                                    <MenuItem value={"F"}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <ErrorMessage name="gender" component="div" className="error-text"  />

                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    value={moment(values.dateOfBirth) || null}
                                    onChange={(newValue) => setFieldValue('dateOfBirth', moment(newValue).format('YYYY-MM-DD'))}
                                    name = 'dateOfBirth'
                                    slotProps={{
                                        textField: {
                                            error:  false,
                                            sx: {
                                                '& .MuiInputBase-root': {
                                                    height: '40px',
                                                    width: '400px',
                                                    fontSize: '0.9rem',
                                                    marginBottom: errors.dateOfBirth && touched.dateOfBirth ? '0rem' : '1rem',
                                                    backgroundColor: '#fafafa',
                                                    border : errors.dateOfBirth && touched.dateOfBirth ? '1px solid red' : '1px solid #ccc',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontSize: '0.8rem',
                                                },
                                            },
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                            <ErrorMessage name="dateOfBirth" component="div" className="error-text" />

                            <Field
                                className={ errors.phoneNumber && touched.phoneNumber ? 'input-error' : 'input'}
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="error-text" />

                            <div className={errors.password && touched.password ? 'error-password-group' : 'password-group'}>
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <ErrorMessage name="password" component="div" className="error-text" />

                            <div className={errors.confirmPassword && touched.confirmPassword ? 'error-password-group' : 'password-group'}>
                                <Field
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="error-text" />

                            <button type="submit" className="signup-button">
                                Sign Up
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Signup;
