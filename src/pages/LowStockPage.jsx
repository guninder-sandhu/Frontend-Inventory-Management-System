import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {Loading} from "../components/Loading.jsx";
import axios from "axios";

export const LowStockPage = () => {
    const {isAuthenticated,getAccessTokenSilently,isLoading} = useAuth0();

    useEffect(() => {
        if(!isLoading && isAuthenticated){
            getAccessTokenSilently()
                .then(token => {
                    console.log("Token retrieved successfully:");
                   return axios.get("http://localhost:8085/dashboard",{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                })
                .then(res => {

                })
                .catch(error => {
                    console.error("Error getting token:", error);
                }
                )
        }
    })
    if(isLoading){
        return <Loading />
    }
    return (
        <><p>lowstock</p></>
    )
}