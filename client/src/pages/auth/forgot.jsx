import React, { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import Layout from '../../component/layout/layout';
import './forgot.css';
import { toast } from 'react-toastify'; // Import toast for notifications
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/forgotpassword`,
                { email, newPassword, answer1, answer2, answer3 }
            );

            if (response.data.success) {
                toast.success('Password reset successful. You can now log in with your new password.');
                setTimeout(() => {
                    navigate(location.state || '/login');
                }, 4000);
                 // Redirect to the login page
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.error(error);
        }
    };


    return (
        <Layout>
            <div className="forgot-password-container">
                <h4 className='mb-4'>Forgot Password</h4>
                <form className="forgot-password-form row g-3" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="email"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* New Password Field */}
                    <div className="col-md-12">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="newPassword"
                            required
                            placeholder="Enter your new password"
                        />
                    </div>

                    {/* Answer 1 Field */}
                    <div className="col-md-12">
                        <label htmlFor="answer1" className="form-label">Favourite color</label>
                        <input
                            type="text"
                            value={answer1}
                            onChange={(e) => setAnswer1(e.target.value)}
                            className="form-control"
                            id="answer1"
                            required
                            placeholder="Enter the answer to security question 1"
                        />
                    </div>

                    {/* Answer 2 Field */}
                    <div className="col-md-12">
                        <label htmlFor="answer2" className="form-label">Your Pet Name</label>
                        <input
                            type="text"
                            value={answer2}
                            onChange={(e) => setAnswer2(e.target.value)}
                            className="form-control"
                            id="answer2"
                            required
                            placeholder="Enter the answer to security question 2"
                        />
                    </div>

                    {/* Answer 3 Field */}
                    <div className="col-md-12">
                        <label htmlFor="answer3" className="form-label">Favourite Sport</label>
                        <input
                            type="text"
                            value={answer3}
                            onChange={(e) => setAnswer3(e.target.value)}
                            className="form-control"
                            id="answer3"
                            required
                            placeholder="Enter the answer to security question 3"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Reset Password</button>
                    </div>

                    <div className="col-12 mt-3 text-center">
                       
                        <p className='text-white'>
                           <a href="/login" className="text-primary forgot-login">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default ForgotPassword;
