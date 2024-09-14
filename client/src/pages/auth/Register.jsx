import React, { useState } from 'react';
import axios from 'axios';  // Don't forget to import axios
import Layout from '../../component/layout/layout';
import './Register.css'; // Import the CSS file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const navigate = useNavigate();

    const emptyField = () => {
        setName('');
        setEmail(''); 
        setPassword(''); 
        setPhone(''); 
        setAddress(''); 
        setAnswer1('');
        setAnswer2('');
        setAnswer3('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                { name, email, password, phone, address, answer1, answer2, answer3 }
            );
            console.log(response);
            if (response.data.success) {
                toast.success('Successfully registered. You can log in now.');
                emptyField(); 
                setTimeout(() => {
                    navigate('/login');
                }, 4000);
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
                <h4 className='mb-4'>Register Here</h4>
                <form className="register-form row g-3" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationName" className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="validationName"
                            required
                            placeholder="Enter your name"
                        />
                    </div>

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

                    {/* Phone Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationPhone" className="form-label">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="validationPhone"
                            required
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Address Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="validationAddress"
                            required
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Answer 1 Field */}
                    <div className="col-md-12">
                      <h4 className='text-white'>Answer the question to Reset Password</h4>
                        <label htmlFor="validationAnswer1" className="form-label"></label>
                        <input
                            type="text"
                            value={answer1}
                            onChange={(e) => setAnswer1(e.target.value)}
                            className="form-control"
                            id="validationAnswer1"
                            required
                            placeholder="Enter your favourite color"
                        />
                    </div>

                    {/* Answer 2 Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationAnswer2" className="form-label"></label>
                        <input
                            type="text"
                            value={answer2}
                            onChange={(e) => setAnswer2(e.target.value)}
                            className="form-control"
                            id="validationAnswer2"
                            required
                            placeholder="Enter your pet name"
                        />
                    </div>

                    {/* Answer 3 Field */}
                    <div className="col-md-12">
                        <label htmlFor="validationAnswer3" className="form-label"></label>
                        <input
                            type="text"
                            value={answer3}
                            onChange={(e) => setAnswer3(e.target.value)}
                            className="form-control"
                            id="validationAnswer3"
                            required
                            placeholder="Enter your favourite sport"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-12">
                        <button className="btn btn-primary" type="submit">Submit form</button>
                    </div>

                    <div className="col-12 mt-3 text-center">
                      
                        <p className='text-white'>
                             Have an account ? <a href="/login" className="text-primary">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Register;

