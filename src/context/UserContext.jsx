import {createContext, useContext, useEffect, useState} from 'react'
import {useAuth0} from "@auth0/auth0-react";

const UserContext = createContext(undefined);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [roles, setRoles] = useState(() => {
        const storedRoles = localStorage.getItem("roles");
        return storedRoles ? JSON.parse(storedRoles) : [];
    });

    // Get Auth0 authentication state
    const { isAuthenticated } = useAuth0();

    // Effect: When not authenticated, clear localStorage and state
    useEffect(() => {
        if (!isAuthenticated) {
            setUser(null);
            setRoles([]);
            localStorage.removeItem("user");
            localStorage.removeItem("roles");
        }
    }, [isAuthenticated]);

    return (
        <UserContext.Provider value={{user, roles, setRoles, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
}