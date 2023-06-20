'use client'
import { useState } from 'react';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleNav = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <button
                className="z-50 p-2 rounded-md bg-gray-800 text-white"
                onClick={toggleNav}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 6h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                    />
                </svg>
            </button>

            {/* Overlay navigation */}
            {isOpen && (
                <div className="fixed top-0 left-0 z-40 w-full h-full bg-neutral-0 bg-opacity-">
                    <div className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out" >
                        {/* Navigation content */}
                        <nav className="p-4">
                            <button className='' onClick={toggleNav}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>

                            </button>
                            <ul>
                                <li>
                                    <a href="/" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="/about" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/signup" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">
                                        Signup
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}