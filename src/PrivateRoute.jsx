import {Loading} from "./components/Loading.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

export const PrivateRoute = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    if (isLoading) {
        return <Loading/>;
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>;
}