import { Link } from 'react-router-dom';

export const SideMenu = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-violet-950 text-white shadow-lg z-40 transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <button onClick={onClose} className="text-white hover:text-red-300">✕</button>
                    </div>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/dashboard" className="hover:text-violet-300 block">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-product" className="hover:text-violet-300 block">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports" className="hover:text-violet-300 block">
                                Reports
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};
