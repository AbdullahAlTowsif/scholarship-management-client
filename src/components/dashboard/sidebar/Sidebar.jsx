import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/scholarship-logo-1.png"
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import MenuItem from "../menu/MenuItem";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import ModeratorMenu from "../menu/ModeratorMenu";

const Sidebar = () => {
    const { logOut } = useAuth();
    const [isActive, setActive] = useState(false);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive);
    };

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div className='block cursor-pointer p-4 font-bold'>
                    <Link to='/'>
                        <img
                            src={logo}
                            alt='logo'
                            className='w-24'
                        />
                    </Link>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-6 w-6' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between bg-gray-100 w-64 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <div>
                    {/* Logo */}
                    <div className='hidden md:flex justify-center items-center bg-[#890C25] px-4 py-2 shadow-lg rounded-lg'>
                        <Link to='/'>
                            <img
                                src={logo}
                                alt='logo'
                                className='w-24'
                            />
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {/* Home Menu */}
                            <MenuItem
                                icon={FaHome}
                                label='Home'
                                address='/dashboard'
                            />
                            <ModeratorMenu></ModeratorMenu>
                        </nav>
                    </div>
                </div>
                <div>
                    <hr />

                    {/* Profile and Logout */}
                    <MenuItem
                        icon={FcSettings}
                        label='Profile'
                        address='/dashboard/profile'
                    />
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>

            {/* Overlay for Small Screens */}
            {isActive && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden'
                    onClick={handleToggle}
                ></div>
            )}
        </>
    );
};

export default Sidebar;