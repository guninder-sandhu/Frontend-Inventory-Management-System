import {Menu, LogOut, UserCircle, Settings} from "lucide-react";
import {useUser} from "../context/UserContext.jsx";
import {Logout} from "./Logout.jsx";

export const Header = ({ onMenuToggle, isMenuOpen}) => {
    const { user, roles } = useUser();

    return (
        <>
            <header className={"flex bg-violet-950 text-white shadow-md h-16 min-w-screen justify-between "}>
                <div className="flex items-center  ml-1">
                    {!isMenuOpen && (
                        <button className="p-2 hover:bg-violet-800 rounded" onClick={onMenuToggle}>
                            <Menu className="h-6 w-6"/>
                        </button>
                    )}
                </div>
                <div className="flex items-center ">
                    <span className="text-lg font-semibold">Welcome to IMS: {user?.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hover:bg-violet-800 p-2 rounded-full">
                        <Settings className="h-5 w-5"/>
                    </button>
                    <button className="hover:bg-violet-800 p-2 rounded-full">
                        <UserCircle className="h-6 w-6"/>
                    </button>
                    {/*<button className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded text-sm">*/}
                    {/*    <LogOut className="inline-block h-4 w-4 mr-1"/>*/}
                    {/*    Logout*/}
                    {/*</button>*/}
                    <Logout/>
                </div>

            </header>
        </>
    )
}