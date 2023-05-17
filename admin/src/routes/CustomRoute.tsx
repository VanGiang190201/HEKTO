import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';
import { getStoredAuth } from '../Utils/helper/localStorage';

export const BlockRouter = () => {
    const token = getStoredAuth();
    // const token = false;
    return token ? (
        <Navigate
            to={'/'}
            replace
        />
    ) : (
        <Outlet />
    );
};

export const ProtectRouter = () => {
    const token = getStoredAuth();
    // const token = false;
    return token ? (
        <Outlet />
    ) : (
        <Navigate
            to={'/login'}
            replace
        />
    );
};
