import { Menu, LogOut, UserCircle, Settings } from "lucide-react";
export const Footer = () => {
    return (
        <>
            <footer className={"flex bg-violet-950 text-white shadow-md md:h-8  w-full justify-center "}>
                <div className="flex items-center">
                    <p>Copyright © {new Date().getFullYear()}</p>
                </div>
            </footer>
        </>
    )
}