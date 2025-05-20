import React from 'react'
import LoginPage from "./pages/LoginPage.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CallbackPage from "./pages/CallbackPage.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {Loading} from "./components/Loading.jsx";
import MainLayout from "./components/MainLayout.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {UserProvider} from "./context/UserContext.jsx";
import {PrivateRoute} from "./PrivateRoute.jsx";

const App = () => {
    const {isLoading, error, isAuthenticated} = useAuth0();
    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <UserProvider>
            <BrowserRouter>

                <Routes>
                    {/* Landing Page (no layout) */}
                    <Route path="/" element={!isAuthenticated ? <LoginPage/> : <Navigate to="/dashboard"/>}/>
                    <Route path="/callback" element={<CallbackPage/>}/>

                    {/* Authenticated Routes (with layout) */}
                    <Route element={<PrivateRoute/>}>
                        <Route path="/dashboard" element={<MainLayout/>}>
                            <Route index element={<Dashboard/>}/>
                            {/*<Route path="inventory" element={<InventoryPage />} />*/}
                            {/*<Route path="add-product" element={<AddProductPage />} />*/}
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>

    )
}
export default App


