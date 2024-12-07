import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import * as Yup from 'yup';
import '../CssComponents/ProfileEdit.css';
import axios from 'axios';

const ProfileEdit = () => {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    // Validation Schema
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        sex: Yup.string().required('Gender is required'),
        dateOfBirth: Yup.string().required('Date of Birth is required'),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const initialValues = {
        firstName: data.User_First_Name || '',
        lastName: data.User_Last_Name || '',
        sex: data.Sex || '',
        dateOfBirth: data.Date_of_Birth || '',
        phoneNumber: data.User_Phone_Number || '',
        email: data.User_Email || '',
        profilePicture: null,
    };

    const handleSubmit = (values) => {
        console.log('Form Submitted:', values);
        axios.post('http://localhost:5001/editprofile', values)
        .then((response) => {
            console.log(response.data);
            navigate('/profiledisplay');
        })
        .catch((error) => {
            console.error(error);
        });
        // ส่งข้อมูลไปยัง backend หรือจัดการอื่น ๆ
    };

    const handleCancel = () => {
        navigate('/profiledisplay');
    };

    return (
        <div className="profile-edit-container">
            <header className="profile-edit-header">
                <h1>Edit Profile</h1>
            </header>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form className="profile-edit-form">
                        <div className={errors.firstName && touched.firstName ? 'form-group-error' : 'form-group'}>
                            <label>First Name</label>
                            <Field
                                type="text"
                                name="firstName"
                                placeholder="Enter your First Name"
                            />
                            <ErrorMessage name="firstName" component="div" className="error-text" />
                        </div>
                        <div className={errors.lastName && touched.lastName ? 'form-group-error' : 'form-group'}>
                            <label>Last Name</label>
                            <Field
                                type="text"
                                name="lastName"
                                placeholder="Enter your Last Name"
                            />
                            <ErrorMessage name="lastName" component="div" className="error-text" />
                        </div>
                            <label>Sex</label>
                        <FormControl fullWidth size="small" sx={{ marginBottom: '1rem', backgroundColor: '#fafafa' }}>
                            {/* <InputLabel id="gender-select-label" sx={{ fontSize: '14px' }}></InputLabel> */}
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={values.sex}
                                onChange={(e) => setFieldValue('sex', e.target.value)}
                                name="sex"
                            >
                                <MenuItem value={"M"}>Male</MenuItem>
                                <MenuItem value={"F"}>Female</MenuItem>
                            </Select>
                            <ErrorMessage name="sex" component="div" className="error-text" />
                        </FormControl>
                        <label>Date of Birth</label>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                value={values.dateOfBirth ? moment(values.dateOfBirth) : null}
                                onChange={(newValue) =>
                                    setFieldValue('dateOfBirth', newValue ? newValue.format('YYYY-MM-DD') : '')
                                }
                                name='dateOfBirth'
                                slotProps={{
                                    textField: {
                                        error: false,
                                        sx: {
                                            '& .MuiInputBase-root': {
                                                height: '40px',
                                                width: '400px',
                                                fontSize: '0.9rem',
                                                marginBottom: '1rem',
                                                backgroundColor: '#fafafa',
                                            },
                                            '& .MuiInputLabel-root': {
                                                fontSize: '0.8rem',
                                            },
                                        },
                                    },
                                }}
                            />
                            <ErrorMessage name="dateOfBirth" component="div" className="error-text" />
                        </LocalizationProvider>
                        <div className={errors.phoneNumber && touched.phoneNumber ? 'form-group-error' : 'form-group'}>
                            <label>Phone Number</label>
                            <Field
                                type="tel"
                                name="phoneNumber"
                                placeholder="Enter your Phone Number"
                            />
                            <ErrorMessage name="phoneNumber" component="div" className="error-text" />
                        </div>
                        <div className={errors.email && touched.email ? 'form-group-error' : 'form-group'}>
                            <label>Email</label>
                            <Field
                                name="email"
                                placeholder="Enter your Email"
                                disabled
                            />
                            <ErrorMessage name="email" component="div" className="error-text" />
                        </div>
                        {/* <div className="form-group">
                            <label>Profile Picture</label>
                            <input
                                type="file"
                                name="profilePicture"
                                onChange={(e) => setFieldValue('profilePicture', e.target.files[0])}
                            />
                        </div> */}
                        <div className="button-group">
                            <button type="submit" className="button" style={{ backgroundColor: "#4CAF50" }}>
                                Save
                            </button>
                            <button type="button" className="button" style={{ backgroundColor: "#dc3545" }} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileEdit;
