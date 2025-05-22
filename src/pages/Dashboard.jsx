import {DashboardCards} from "../components/dashboard/DashboardCards.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";
import {Loading} from "../components/Loading.jsx";

export const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({})
    const {getAccessTokenSilently, isAuthenticated, isLoading} = useAuth0();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            getAccessTokenSilently()
                .then(token => {
                    console.log("Token retrieved successfully:", token);
                    return axios.get("http://localhost:8085/dashboard", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                })
                .then(response => {
                    setDashboardData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    //setError(true);
                    setLoading(false);

                    console.error("Error fetching dashboard data:", error);
                });
        }
    }, [getAccessTokenSilently, isAuthenticated, isLoading]);

    if (isLoading || !dashboardData || loading) {
        return <Loading/>;
    }

    // if(error){
    //     return <div>Error</div>
    // }


    const productCount = dashboardData.data?.productCount || "--";
    const stockCount = dashboardData.data?.stockCount || "--";
    const lowStockQuantity = dashboardData.data?.lowStockCount || "--";
    const totalInventoryCost = dashboardData.data?.totalInventoryCost || "--";


    const lowStockColor = lowStockQuantity === 0
        ? "bg-green-300"
        : "bg-red-300";
    return (
        <>
            <div className={"flex flex-col  w-full h-full"}>
                <div className="flex-[2] w-full px-4 py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <DashboardCards title="Total Products" quantity={productCount} label="Unique Products" link={"low-stock"}/>
                        <DashboardCards title="Stock Levels" quantity={stockCount} label="Total Units in Stock" link={"/stock"}/>
                        <DashboardCards title="Low Stock" quantity={lowStockQuantity} color={lowStockColor} label={lowStockQuantity === 0 ? "All Good" : "Need Attention"} link={"low-stock"} />
                        <DashboardCards title="Inventory Value" quantity={totalInventoryCost} label="Total Value" link={"low-stock"}/>
                        <DashboardCards title="Pending Orders" quantity={8} color="bg-yellow-300" label="Awaiting Fulfillment" link={"low-stock"}/>
                    </div>
                </div>
                <div className={"flex flex-[3] border-b-gray-800 w-full"}>

                </div>

            </div>
        </>
    )
}