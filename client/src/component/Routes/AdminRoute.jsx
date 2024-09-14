import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import { Outlet } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);  // Default to false to show spinner initially
    const [auth] = useAuth();  // Use the authentication context

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/auth/admin-auth`,
                   {
                    headers:{
                        Authorization : auth?.token
                    }
                   }
                );
                if (res.data.ok) {
                    setOk(true);  // Set to true if authentication is successful
                } else {
                    setOk(false);  // Set to false if not authenticated
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setOk(false);  // On error, also set to false
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            setOk(false);  // If there's no token, the user isn't authenticated
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path= "" />;  // Render the protected route if authenticated, otherwise show spinner
};


export default AdminRoute