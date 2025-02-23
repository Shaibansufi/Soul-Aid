import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../context/auth';

const PrivateRoute = () => {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const authCheck = async () => {
            try {
                const response = await axios.get('/api/v1/auth/user-auth', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                if (response.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log('Auth check error', error);
                setOk(false);
            } finally {
                setLoading(false); // Set loading to false after the check is complete
            }
        };

        if (auth.token) {
            authCheck();
        } else {
            setOk(false);
            setLoading(false); // If no token, set loading to false immediately
        }
    }, [auth.token]);

    // Show a loading spinner or message while checking auth
    if (loading) {
        return <div>Loading...</div>; // Replace with your loading component
    }

    // Render the protected route or redirect to login
    return ok ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;