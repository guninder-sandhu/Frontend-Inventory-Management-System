import React from 'react'
import {useAuth0} from "@auth0/auth0-react";

const Login = () => {
    const {loginWithRedirect} = useAuth0();
    return (
        <>
            <div className="flex flex-col h-screen w-screen">
                {/* Top section - 2/3 height */}
                <div
                    className="flex flex-col sm:flex-row flex-2 items-center justify-between p-8 md:p-16 md:pb-0  border-b-gray-700 shadow dark:shadow-zinc-700 rounded-b-m">
                    <div className="flex-1 text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold">IMS Pro</h1>
                        <p className="text-lg text-gray-600  dark:text-gray-400">Smart Inventory Management for Your
                            Business</p>
                        <button onClick={()=> loginWithRedirect()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login / Get Started
                        </button>
                    </div>
                    <div
                        className="w-full bg-gray-50 dark:bg-zinc-900 flex-1 mt-4 md:mt-0 max-h-md rounded  border-b-gray-700 shadow-xl p-5 md:p-7">
                        <h2 className="font-semibold text-gray-800 mb-4 dark:text-gray-400">Inventory</h2>
                        <div className="grid grid-cols-3 gap-4 mb-6 text-center ">
                            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
                                <div className="text-xl font-bold ">50</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Stock Levels</div>
                            </div>
                            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
                                <div className="text-xl font-bold">200</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Product Count</div>
                            </div>
                            <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
                                <div className="text-xl font-bold">$25000</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Total Inventory</div>
                            </div>
                        </div>
                        <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-5 overflow-x-auto">
                            <table
                                className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead>
                                <tr className="border-2 border-gray-300 dark:border-gray-700 rounded-lg ">
                                    <th className="pl-2">Name</th>
                                    <th className="pl-2">SKU</th>
                                    <th className="pl-2">Stock</th>
                                    <th className="pl-2">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[
                                    ["Product A", "SKU1", "10", "$10.00"],
                                    ["Product B", "SKU2", "10", "$20.00"],
                                    ["Product C", "SKU3", "20", "$90.00"],
                                    ["Product E", "SKU4", "10", "$10.00"],
                                ].map(([name, sku, stock, price]) => (
                                    <tr key={sku}>
                                        <td>{name}</td>
                                        <td>{sku}</td>
                                        <td>{stock}</td>
                                        <td>{price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-center">Why Choose IMS Pro</h1>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-center w-full pt-3">
                    {[
                        ["📈", "Track Stock", "Monitor inventory levels in real-time."],
                        ["📦", "Manage Products", "Easily add, update, and organize items."],
                        ["📊", "Generate Reports", "Create detailed reports on sales and inventory."],
                    ].map(([icon, title, desc]) => (
                        <div key={title} className="hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
                            <div className="text-3xl text-blue-600 mb-2">{icon}</div>
                            <h3 className="font-semibold text-lg">{title}</h3>
                            <p className="text-sm text-gray-500">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Login


