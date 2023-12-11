import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';


function Dashboard() {
    const navigate = useNavigate();

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {


        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        const isAuthenticated = async () => {

            setLoading(true);

            await axios.get("https://tutorswan-backend.onrender.com/user/me",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }

                }).then(function (response) {
                    console.log(response);
                    if (response.data) {

                        setUserData(response.data);
                    }
                }).catch(function (error) {
                    console.log(error, "error");

                    navigate.push("/register");
                    // }
                    try {
                        if (error.response.data.detail) {
                            // navigate.push("/register");
                        }
                    }
                    catch { /* empty */ }
                });

            setLoading(false);

        }

        if (token) {
            isAuthenticated();
        }

        else {
            navigate("/login");
        }

    }, []);

    return (
        <>
            <Spin spinning={loading}>
                <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-3 py-3 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start rtl:justify-end">
                                <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                    <span className="sr-only">Open sidebar</span>
                                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                    </svg>
                                </button>
                                <Link to="/" className="flex ms-2 md:me-24">
                                    <img src={logo} className="h-8 me-3" alt="Tutor Swan Logo" />
                                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Tutor Swan</span>
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center ms-3">
                                    <div>
                                        <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
                                            <span className="sr-only">Open user menu</span>
                                            <img className="bg-white p-1.5 w-8 h-8 rounded-full" src="https://www.icmetl.org/wp-content/uploads/2020/11/user-icon-human-person-sign-vector-10206693.png" alt="user photo" />
                                        </button>
                                    </div>
                                    <div className={`absolute right-10 top-10 z-50 ${isProfileMenuOpen ? "" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user`}>
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                                                {userData ? userData.name : "loading..."}
                                            </p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                                {userData ? userData.email : "loading..."}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                                    Total credits: {userData ? userData.total_credits : "loading..."}
                                                </span>
                                            </li>
                                        </ul>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <button 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" 
                                                    role="menuitem"
                                                    onClick={() => {
                                                        localStorage.removeItem("token");
                                                        sessionStorage.removeItem("token");
                                                        navigate("/login");
                                                    }}
                                                >
                                                    Sign out
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 ${isSidebarOpen ? "translate-x-0" : ""} dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar`}>
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/dashboard/create-subject" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    {/* <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg> */}
                                    <svg className='w-6 h-6  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    <span className="ms-3">Create subject</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <div className='flex'>
                                        <svg className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' strokeWidth="1.5" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M5 19.5V5C5 3.89543 5.89543 3 7 3H18.4C18.7314 3 19 3.26863 19 3.6V21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M9 7L15 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 15L19 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 18L19 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 21L19 21" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path><path d="M6.5 18C5.5 18 5 17.3284 5 16.5C5 15.6716 5.5 15 6.5 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.5 21C5.5 21 5 20.3284 5 19.5C5 18.6716 5.5 18 6.5 18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">Subjects</span>
                                    </div>
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}><path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                                </button>
                                {
                                    isDropdownOpen &&
                                    <div className="mt-2 space-y-2">
                                        {
                                            userData ?
                                                userData.subjects.map((subject, index) => (
                                                    <Link key={index} to={`/dashboard/subject/${subject}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                                        <span className="sr-only">Open user menu</span>
                                                        <span className="flex-1 ms-3 whitespace-nowrap">{subject}</span>
                                                    </Link>
                                                )) : "loading..."
                                        }
                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="p-4 sm:ml-64">
                    <Outlet context={userData} />
                </div>
            </Spin>
        </>
    )
}


export { Dashboard };



