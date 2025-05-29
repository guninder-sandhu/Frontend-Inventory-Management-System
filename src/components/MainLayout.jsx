import React, {useState} from 'react';
import {Header} from './Header';
import {SideMenu} from './headerComponents/SideMenu';
import {Footer} from './Footer';
import {Outlet} from "react-router-dom";



export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <div className="flex min-h-screen">
            {/* Sidebar for desktop */}
            <div
                className={`
      hidden md:flex flex-col bg-violet-950 text-white shadow-lg
      transition-[width] duration-300 overflow-hidden
      ${menuOpen ? 'w-64' : 'w-0'}
    `}
            >
                <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>

            {/* Sidebar for mobile (overlay) */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0  bg-opacity-50"
                        onClick={() => setMenuOpen(false)}
                    />
                    {/* Sidebar */}
                    <div className="absolute top-0 left-0 h-full w-64 bg-violet-950 text-white shadow-lg transition-transform duration-300 transform translate-x-0">
                        <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex flex-col flex-1 transition-all duration-300">
                <Header
                    isMenuOpen={menuOpen}
                    onMenuToggle={() => setMenuOpen((prev) => !prev)}
                />
                <main className="flex-1 flex justify-center items-center p-4">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}
