import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/user.service';
import LoadingPage from '../views/LoadingPage/LoadingPage';

const ProtectedRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const isLoggedIn = await isAuthenticated();
            setIsLoggedIn(isLoggedIn);
            setIsLoading(false);
        }
        checkAuth();
    }, [])
    
        if (isLoading) {
            return <LoadingPage />
        }
        else if (pathname === '/login' || pathname === '/register') {
            return isLoggedIn ? <Navigate to="/" /> : <Outlet />
        } else {
            return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
        }
}

export default ProtectedRoute;
