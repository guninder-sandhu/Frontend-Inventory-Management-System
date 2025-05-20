import React, {useEffect, useState} from 'react'
import {useAuth0} from "@auth0/auth0-react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Loading} from "../components/Loading.jsx";
import {useUser} from "../context/UserContext.jsx";

const CallbackPage = () => {
    const {getAccessTokenSilently, isAuthenticated, isLoading, user} = useAuth0();
    const  navigate = useNavigate();
    const { setUser, setRoles } = useUser();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            getAccessTokenSilently()
                .then(token => {
                    console.log("Access Token:", token);
                    const decodedJwt = jwtDecode(token);
                    const userRole = decodedJwt["https://ims-api.com/roles"] || [];
                    console.log(userRole);
                    setRoles(userRole);
                    setUser(user)
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("roles", JSON.stringify(userRole));
                    return axios.get( "http://localhost:8085/auth/validate",
                        {headers:{
                            Authorization: `Bearer ${token}`
                            }})
                        .then(response => {
                                console.log("Got response",response)
                                console.log(response.data);
                            if (response.status === 200) {
                                navigate('/dashboard');
                            }
                            })
                        .catch(e => {
                            console.log("Token Validation error",e)
                            navigate('/login');
                        });

                })
                .catch(error => {
                    console.error("Error getting token:", error);
                });
        }
    }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);
    if (isLoading) {
        return <Loading />;
    }


    return (
        <Loading />
    );


}
export default CallbackPage
