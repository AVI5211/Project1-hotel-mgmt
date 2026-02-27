import React, { useState } from "react";
import { CgCoffee } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdOutlineNightsStay } from "react-icons/md";
function GuestNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex  sm:flex-row items-center lg:justify-between gap-4 lg:gap-72 p-4 mb-4 relative lg:bg-slate-300 lg:bg-opacity-50 lg:my-2 shadow-sm  shadow-white rounded-xl ">
      <Link to={"/"}>
        <div className="flex items-center font-bold text-xl text-[#0e246d]  gap-2">
          <CgCoffee />
          <p className="font-Oswald">THE VILLAS</p>
        </div>
      </Link>

      <div className="sm:hidden text-white">
        <button onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <ul className="hidden sm:flex gap-5 items-center font-medium text-blue-400">
        <NavItem to="/bookings" label="BOOKINGS" />
        <NavItem to="/profile" label="PROFILE" />
      </ul>

      {isOpen && (
        <ul className="flex flex-col gap-4 items-start font-medium text-blue-500 sm:hidden bg-slate-300  absolute top-full left-0 w-full p-4 z-50">
          <NavItem to="/bookings" label="Bookings" />
          <NavItem to="/profile" label="Profile" />
        </ul>
      )}
    </div>
  );
}

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <li className="w-full">
    <Link to={to} className="relative group cursor-pointer block w-full">
      <span className="hover:text-blue-700 text-white font-semibold">
        {label}
      </span>
      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
    </Link>
  </li>
);

export default GuestNavbar;
