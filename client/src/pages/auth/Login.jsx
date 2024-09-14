import React, { useState } from 'react';
import axios from 'axios';  // Don't forget to import axios
import Layout from '../../component/layout/layout';
import './Register.css'; // Import the CSS file
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../component/context/auth';
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    const emptyField = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                { email, password }
            );

            if (response.data.success) {
                toast.success('Login successful');
                setAuth({
                    user: response.data.user,
                    token: response.data.token,
                });
                Cookies.set('auth', JSON.stringify(response.data), { expires: 1/24 }); 

                emptyField();
                

                setTimeout(() => {
                   
                    navigate(location.state || "/");
                }, 3000);
            

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.log(error);
        }
    };
    
    return (
        <Layout>
            <div className="register-form-container">
                <h4 className='mb-4'>Login Here</h4>
                <form className="register-form row g-3" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="validationEmail"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="validationPassword"
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>

                    {/* Links for Forgot Password and Sign Up */}
                    <div className="col-12 mt-3 text-center">
                        <p>
                            <a href="/forgot-password" className="text-primary">Forgot Password?</a>
                        </p>
                        <p className='text-white'>
                            Don't have an account? <a href="/register" className="text-primary">Sign Up</a>
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
