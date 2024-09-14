import React, { useEffect, useState } from 'react';
import Layout from '../../component/layout/layout';
import UserMenu from '../../component/Layout/UserMenu';
import { useAuth } from '../../component/context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [auth, setAuth] = useAuth('');
  useEffect(() => {
    if (auth.user) {
      const { name, email, phone, address } = auth.user;
      setName(name);
      setEmail(email );
      setPhone(phone );
      setAddress(address );
    }
  }, [auth.user]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const _id = auth.user._id;
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update-user`,
        { _id, name, email, phone, address },
        {
          headers: {
            Authorization: ` ${auth?.token}`,
          },
        }
      );

      if (data) {
        console.log(data,'1');
        console.log(data.data,'2');
        // Update auth state and cookie
        setAuth({
          ...auth,
          user: data.data,
         
        });
        console.log(data.data.name)
        let cookie = Cookies.get('auth');
        cookie = JSON.parse(cookie);
        cookie.user = data;
        Cookies.set('auth', JSON.stringify(cookie), { expires: 1 / 24 });

        

        toast.success('Successfully updated data');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      console.log(error);
    }
  };

  // Update form fields when the auth.user changes
 

  return (
    <Layout title={"dashboard - Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-5">
            <UserMenu />
          </div>
          <div className="col-md-7 ml-4 ">
            <h1>Profile</h1>
            <form className="register-form row g-3 mt-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="col-md-12">
                <label htmlFor="validationName" className="form-label">Name</label>
                <input
                  type="text"
                  value={name || ''} // Always provide a fallback value
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
                  value={email || ''} // Always provide a fallback value
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="validationEmail"
                  required
                  placeholder="Enter your email"
                  disabled
                />
              </div>

              {/* Phone Field */}
              <div className="col-md-12">
                <label htmlFor="validationPhone" className="form-label">Phone</label>
                <input
                  type="text"
                  value={phone || ''} // Always provide a fallback value
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
                  value={address || ''} // Always provide a fallback value
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="validationAddress"
                  required
                  placeholder="Enter your address"
                />
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button className="btn btn-primary" type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
