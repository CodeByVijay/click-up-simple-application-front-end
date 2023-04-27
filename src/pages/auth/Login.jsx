import React from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 sm:grid-cols-2 h-screen">
        <div className="partOne xl:col-span-2 md:col-span-1 lg:col-span-2 sm:col-span-1 hidden sm:hidden lg:block md:block xl:block"><img src="https://w0.peakpx.com/wallpaper/116/459/HD-wallpaper-microchip-neon-lines-black-background-chips-technology-backgrounds.jpg" alt="" className="object-cover w-full h-screen"/></div>
        
        <div className="partTwo col-span-3 xl:col-span-1 md:col-span-2 lg:col-span-1 sm:col-span-2 bg-blue-100 grid place-content-center sm:place-content-center px-10 py-5 border-gray-300 border-2 h-screen shadow-lg shadow-gray-600 hover:shadow-gray-900 rounded-md">
          <div className="head text-center">
            <h3 className="text-3xl content-center py-2 text-blue-600 font-bold border-b-2 border-gray-300 mb-5">
              Login
            </h3>
          </div>
          <div className="form">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-600"/>
              </div>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@email.com"
              />
            </div>

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-600"/>
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="************"
              />
            </div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full">
              Login
            </button>

            <p className="font-light mt-3 text-center">If not have account. Please <Link to="/register" className="font-bold text-blue-600 hover:text-blue-800">Register here..!</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
