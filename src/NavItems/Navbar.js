import React from "react";
import Toggle from "../components/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 border-gray-200 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <div className="flex items-center mx-auto"></div>

        <div className="flex justify-end pr-4">
          <span className="text-xl font-medium mt-1 px-3 whitespace-nowrap dark:text-white">
            Welcome <span className="text-green-800 dark:text-rose-600">Test</span>
          </span>
          <Toggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
