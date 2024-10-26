// Header.js
import React from 'react';
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'; // Import icons as needed

const Header = () => {
    
    return (
        <header className="h-[15vh] flex flex-col">
            {/* Top Section */}
            <div className="flex items-center justify-end space-x-4 h-1/4 bg-black text-white">
                <ul className="flex justify-center space-x-6">
                    <li><a href="#" className="hover:text-blue-400">Help</a></li>
                    <li><a href="#" className="hover:text-blue-400">Order & Returns</a></li>
                    <li><a href="#" className="hover:text-blue-400">Hi, name</a></li>
                </ul>
            </div>

            {/* Main Section */}
            <div className="flex items-center justify-between h-2/4 px-4 bg-black text-white">
                <div className=" md:text-2xl font-bold">
                    ECOMMERCE
                </div>

                <nav className="flex-grow text-center">
                    <ul className="flex justify-center space-x-6">
                        <li><a href="#" className="hover:text-blue-400">Categories</a></li>
                        <li><a href="#" className="hover:text-blue-400">Sale</a></li>
                        <li><a href="#" className="hover:text-blue-400">Clearance</a></li>
                        <li><a href="#" className="hover:text-blue-400">New Stock</a></li>
                        <li><a href="#" className="hover:text-blue-400">Trending</a></li>
                    </ul>
                </nav>

                <div className="flex items-center space-x-4">
                    <SearchIcon className="h-6 w-6 hover:text-blue-400" />
                    <ShoppingCartIcon className="h-6 w-6 hover:text-blue-400" />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-center space-x-4 h-1/4 bg-[#F4F4F4]">
                <span>&lt;</span>
                <span className="mx-4">Get 10% off on business sign up</span>
                <span>&gt;</span>
            </div>
        </header>
    );
};

export default Header;
