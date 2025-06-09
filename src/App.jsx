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
import {LowStockPage} from "./pages/LowStockPage.jsx";
import {AddProductPage} from "./pages/AddProductPage.jsx";
import {ProductDetailPage} from "./pages/ProductDetailPage.jsx";

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
                    <Route element={<PrivateRoute />}>
                        <Route element={<MainLayout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/low-stock" element={<LowStockPage />} />
                            <Route path="/add-product" element={<AddProductPage />} />
                            <Route path="/product-detail/:productCode" element={<ProductDetailPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>

    )
}
export default App


