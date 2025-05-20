import React, {useState} from 'react';
import {Header} from './Header';
import {SideMenu} from './headerComponents/SideMenu';
import {Footer} from './Footer';
import {Outlet} from "react-router-dom";



export default function MainLayout() {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <div className="flex">
            <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}/>

            <div
                className={`flex flex-col min-h-screen flex-1 transition-all duration-300 ${menuOpen ? 'md:ml-64' : 'ml-0'}`}>
                <Header
                    isMenuOpen={menuOpen}
                    onMenuToggle={() => setMenuOpen(prev => !prev)}
                />
                <main className="flex-1 p-4">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    );
}
