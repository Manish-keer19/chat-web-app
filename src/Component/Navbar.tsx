import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { title: "Home", path: "/home" },
  { title: "Calculator", path: "/calc" },
  { title: "Simple Chat", path: "/simple-message" },
  { title: "Advanced Chat", path: "/advance-MessageUi" },
  { title: "Todo List", path: "/todos" },
  { title: "Profile", path: "/profile" },
  { title: "About", path: "/about" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-indigo-900 via-blue-800 to-teal-800 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-extrabold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
          ChatApp
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-3xl focus:outline-none"
          >
            {isMenuOpen ? (
              <span className="text-4xl absolute right-0 text-white z-1000 ">
                ✖️
              </span>
            ) : (
              <span className="text-4xl">☰</span>
            )}
          </button>
        </div>

        {/* Menu Items (Desktop and Mobile) */}
        <ul
          className={`lg:flex lg:space-x-6 absolute lg:static bg-black bg-opacity-90 lg:bg-transparent w-full lg:w-auto p-6 lg:p-0 transition-all duration-500 ease-in-out transform ${
            isMenuOpen ? "top-0 opacity-100" : "top-[-100vh] opacity-0"
          } lg:top-0 left-0 lg:opacity-100 z-50`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="group relative mb-4 lg:mb-0">
              <Link
                to={item.path}
                className="text-white text-lg sm:text-xl font-semibold capitalize tracking-wider transition-transform duration-300 hover:text-teal-300"
              >
                {item.title}
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-teal-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
