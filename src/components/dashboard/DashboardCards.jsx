import React from 'react';
import { Link } from 'react-router-dom';
export const DashboardCards = ({title, quantity, color = "bg-violet-100 dark:bg-[#1e1e2f]", label,link}) => {
    return (

        <Link to={link}>
            <div
                className={`flex flex-col ${color} flex-1 min-w-[100px] max-w-[200px] min-h-[150px] max-h-[250px] rounded-xl shadow-md items-center justify-center flex-wrap`}>
                <div className="text-md md:text-lg font-small md:font-medium text-gray-600 mb-2">{title}</div>
                {/* Divider */}
                <hr className="w-3/4 border-t-2 border-gray-600 mb-2"/>
                {/* Quantity or Main Value */}
                <div
                    className="text-lg font-small font-medium md:text-2xl md:font-bold text-gray-900 mb-1">{quantity}</div>
                {/* Label */}
                <div className="text-sm md:text-md font-small md:font-medium text-gray-500">{label}</div>
            </div>
        </Link>

    )
}