import { useAuth0 } from "@auth0/auth0-react";
import { LogOut } from "lucide-react";
import {useUser} from "../context/UserContext.jsx";

export const Logout = () => {
    const { logout } = useAuth0();
    const { setUser, setRoles } = useUser();

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
        // Clear React context
        setUser(null);
        setRoles([]);
        // Call Auth0 logout
        logout({
            logoutParams: { returnTo: window.location.origin }
        });
    };
    return (
        <>

                <button
                    onClick={handleLogout}
                    className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded text-sm">
                    <LogOut className="inline-block h-4 w-4 mr-1" />
                </button>

        </>
    );
};
