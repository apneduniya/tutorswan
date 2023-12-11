import { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="w-full transparent fixed top-0 left-0 py-6 px-5 flex justify-between items-center bg-white">
            <Link to="/" className='flex gap-2 items-center cursor-pointer'>
                <img src={logo} alt="logo" className='h-16 w-16' />
                <h1 className="font-bold text-3xl">Tutor Swan</h1>
            </Link>
            {/* Hamburger menu for tablets and mobile */}
            <div className="lg:hidden cursor-pointer" onClick={toggleMobileMenu}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-9 w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#08823F"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </div>
            {/* Desktop menu */}
            <ul className={`hidden lg:flex justify-between items-center min-w-[400px] text-lg ${mobileMenuOpen ? 'md:hidden' : ''}`}>
                <Link to="/services" className='cursor-pointer hover:text-[#08823F]'>Services</Link>
                <Link to="/pricing" className='cursor-pointer hover:text-[#08823F]'>Pricing</Link>
                <Link to="/about" className='cursor-pointer hover:text-[#08823F]'>About</Link>
            </ul>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="fixed top-0 left-0 h-screen w-full bg-white z-50">
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMobileMenu}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col items-center text-lg">
                        <Link to="/services" className='cursor-pointer hover:text-[#08823F]' onClick={toggleMobileMenu}>
                            Services
                        </Link>
                        <Link to="/pricing" className='cursor-pointer hover:text-[#08823F]' onClick={toggleMobileMenu}>
                            Pricing
                        </Link>
                        <Link to="/about" className='cursor-pointer hover:text-[#08823F]' onClick={toggleMobileMenu}>
                            About
                        </Link>
                    </ul>
                    <ul className='hidden lg:flex gap-10 items-center text-lg'>
                        {
                            localStorage.getItem('token') ?
                                <>
                                    <Link to="/dashboard">
                                        <button className='border-2 border-[#08823F] text-[#08823F] px-5 py-2 rounded-lg'>Dashboard</button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/login">
                                        <button className='border-2 border-[#08823F] text-[#08823F] px-5 py-2 rounded-lg'>Sign In</button>
                                    </Link>
                                    <Link to="/register">
                                        <button className='bg-[#08823F] text-white px-5 py-2 rounded-lg'>Sign Up</button>
                                    </Link>
                                </>
                        }
                    </ul>
                </div>

            )}
            {/* Buttons */}
            <ul className='hidden lg:flex gap-10 items-center text-lg'>
                <Link to="/login">
                    <button className='border-2 border-[#08823F] text-[#08823F] px-5 py-2 rounded-lg'>Sign In</button>
                </Link>
                <Link to="/register">
                    <button className='bg-[#08823F] text-white px-5 py-2 rounded-lg'>Sign Up</button>
                </Link>
            </ul>
        </div>
    );
}

export { Navbar };
