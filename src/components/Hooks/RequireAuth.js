import { Navigate, useLocation } from "react-router-dom";
import useUser from "./useUser";

const RequireAuth = ({ children }) => {
    const user = useUser()
    const token = localStorage.getItem('accessToken')
    const location = useLocation()
    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    else if (user) {
        return children
    }
}

export default RequireAuth