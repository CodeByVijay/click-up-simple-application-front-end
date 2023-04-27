import { React, useState } from "react";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || conPassword === "") {
      setMsg("Please fill all fields.");
      setMsgColor("text-rose-600");
    } else if (!validator.isEmail(email)) {
      setMsg("Please enter valid email address.");
      setMsgColor("text-rose-600");
    } else if (password !== conPassword) {
      setMsg("Please enter same password & confirm password.");
      setMsgColor("text-rose-600");
    } else {
      setMsg("");
      const userData = {
        name: name,
        email: email,
        password: password,
        conPassword: conPassword,
      };
      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/api/register",
          userData
        );
        if (res.data.result === "failed") {
          setMsgColor("text-rose-600");
          setMsg(res.data.msg);
        } else {
          setEmail("");
          setConPassword("");
          setPassword("");
          setName("");
          setMsgColor("text-green-600");
          setMsg(res.data.msg);
          // navigate("../");
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 sm:grid-cols-2 h-screen">
        <div className="partOne col-span-3 xl:col-span-1 md:col-span-2 lg:col-span-1 sm:col-span-2 px-10 py-5 bg-blue-100 border-gray-300 border-2 grid place-content-center sm:place-content-center shadow-lg shadow-gray-600 hover:shadow-gray-900 rounded-md">
          <div className="head text-center">
            <h3 className="text-3xl content-center py-2 text-blue-600 font-bold border-b-2 border-gray-300 mb-5">
              Register
            </h3>
            <p className={`my-2 ${msgColor}`}>{msg}</p>
          </div>
          <div className="form">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt className="text-gray-600" />
              </div>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-600" />
              </div>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                <FaLock className="text-gray-600" />
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label
              htmlFor="password2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-600" />
              </div>
              <input
                type="password"
                id="password2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="************"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded-full"
              onClick={handleRegister}
            >
              Register
            </button>

            <p className="font-light mt-3 text-center">
              If you have account. Please{" "}
              <Link
                to="/"
                className="font-bold text-blue-600 hover:text-blue-800"
              >
                Login here..!
              </Link>
            </p>
          </div>
        </div>

        <div className="partTwo xl:col-span-2 md:col-span-1 lg:col-span-2 sm:col-span-1 hidden sm:hidden lg:block md:block xl:block">
          <img
            src="https://w0.peakpx.com/wallpaper/116/459/HD-wallpaper-microchip-neon-lines-black-background-chips-technology-backgrounds.jpg"
            alt=""
            className="object-cover w-full h-screen rotate-180"
          />
        </div>
      </div>
    </>
  );
};

export default Register;
