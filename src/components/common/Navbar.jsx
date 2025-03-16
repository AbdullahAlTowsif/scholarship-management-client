import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import user_pic from "../../assets/user.png"
const Navbar = () => {
    const { user, logOut } = useAuth()
    const links = (
        <>
            <li>
                <NavLink
                    to={'/'}
                    style={{ backgroundColor: "#89890C", color: "white", fontWeight: "bold" }}
                >
                    Home
                </NavLink>
            </li>
            <li><a>All Scholarship</a></li>
        </>
    )
    return (
        <div className="bg-[#890C25] mb-5">
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">ScholarEase</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        !user && (
                            <Link to="/auth/register" className="btn btn-ghost mr-2">
                                Register
                            </Link>
                        )
                    }

                    {
                        user && (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img alt="User Avatar" src={user && user.photoURL ? user.photoURL : user_pic} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <span className="text-gray-700 font-semibold cursor-default">
                                            {user.displayName}
                                        </span>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/profile">Dashboard</Link>
                                    </li>
                                    <li>
                                        <button onClick={logOut}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;