import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
const ProtectedRoutes = (props) => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    if (loading)
        return _jsx("div", { children: "loading..." });
    return user ? (_jsx(Outlet, {})) : (_jsx(Navigate, { to: "/login", state: { from: location } }));
};
export default ProtectedRoutes;
