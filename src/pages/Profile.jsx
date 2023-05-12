import React, { useContext, useState } from "react";
import { MainContextState } from "../contexts/MainContext";
import Layout from "../components/Layout";
import axios from "axios";
import { base_path } from "../App";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import Loader from "./loader/Loader";

const cookies = new Cookies();

const Profile = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const { users, setUsers, setLoginCheck } = useContext(MainContextState);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordBtn, setPasswordBtn] = useState(true);
  const [pswMsg, setPswMsg] = useState("");

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setShowPasswordModal(false);
  };

  const handleProfileModalOpen = () => {
    setUserName(users.name);
    setUserEmail(users.email);
    setShowProfileModal(true);
  };

  const handlePasswordModal = () => {
    setPassword("");
    setConfirmPassword("");
    setPswMsg("");
    setShowPasswordModal(true);
  };

  const handlePassword = (e) => {
    const pw = e.target.value;
    setPassword(pw);

    if (confirmPassword.length > 0) {
      if (pw === confirmPassword) {
        setPswMsg("");
        setPasswordBtn(false);
      } else {
        setPswMsg("Password Not Match.");
        setPasswordBtn(true);
      }
    } else {
      setPswMsg("");
    }
  };
  const handleConfirmPassword = (e) => {
    const pw = e.target.value;
    setConfirmPassword(pw);

    if (password.length > 0) {
      if (pw === password) {
        setPswMsg("");
        setPasswordBtn(false);
      } else {
        setPswMsg("Password Not Match.");
        setPasswordBtn(true);
      }
    } else {
      setPswMsg("");
    }
  };

  const togglePassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    setLoader(true);
    const postData = {
      id: users.id,
      name: userName,
      email: userEmail,
    };
    axios
      .post(`${base_path}update-profile`, postData)
      .then((res) => {
        if (res.data.result === "success") {
          setShowProfileModal(false);
          setTimeout(() => {
            setShowLogoutModal(true);
            cookies.remove("access_token");
            cookies.remove("user_data");
            setUsers([]);
            setLoginCheck(false);
            setLoader(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
  const handleUpdatePassword =(e)=>{
    e.preventDefault();
    setLoader(true);
    const postData ={
      id:users.id,
      password:password
    }
    axios
    .post(`${base_path}update-password`, postData)
    .then((res) => {
      if (res.data.result === "success") {
        setShowPasswordModal(false);
        setTimeout(() => {
          setShowLogoutModal(true);
          cookies.remove("access_token");
          cookies.remove("user_data");
          setUsers([]);
          setLoginCheck(false);
          setLoader(false);
        }, 1500);
      }
    })
    .catch((err) => {
      console.log(err.response.data.msg);
    });
  }

  const handleLogout = (e) => {
    e.preventDefault();
    setLoader(true);
    cookies.remove("access_token");
    cookies.remove("user_data");
    setUsers([]);
    setLoginCheck(false);
    setTimeout(() => {
      setLoader(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      {loader && <Loader />}
      <Layout>
        <div className="profile bg-gray-50">
          <div className="head rounded-lg shadow-lg shadow-gray-500 p-5">
            <p className="text-center text-lg font-black">
              Welcome!{" "}
              <span className="text-green-600 hover:text-green-700">
                {users.name}
              </span>
            </p>
          </div>

          <div className="userBody p-5 m-10">
            <div className="grid grid-cols-2">
              <div className="one leading-10">
                <p>
                  Name : <span className="text-green-600">{users.name}</span>
                </p>
                <p>
                  Email : <span className="text-green-600">{users.email}</span>
                </p>
                <p>
                  Status :{" "}
                  <span className="text-green-600">
                    {users.status === 1 ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        Block
                      </span>
                    )}
                  </span>
                </p>
              </div>
              <div className="two">
                <p className="float-left m-2">
                  <button
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={handleProfileModalOpen}
                  >
                    Edit Profile
                  </button>
                </p>

                <p className="float-left m-2">
                  <button
                    className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={handlePasswordModal}
                  >
                    Change Password
                  </button>
                </p>
                {/* <img
                  src={users.avatar ? users.avatar : userImage}
                  alt="user image"
                  width="64"
                  height="64"
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showProfileModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">
                      Edit Profile
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      id="Task_Name"
                      className="rounded-none rounded-r-lg mt-4 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />

                    <input
                      type="text"
                      id="Task_Name"
                      className="rounded-none rounded-r-lg mt-4 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs"
                      type="button"
                      onClick={() => handleCloseModal()}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-green-600 rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs"
                      type="button"
                      onClick={(e) => handleUpdateDetails(e)}
                    >
                      Update Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {/* Edit Profile Modal End */}

        {/* Update Password Modal */}
        {showPasswordModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">
                      Update Password
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <input
                      type={passwordType}
                      id="password"
                      className="rounded-none rounded-r-lg mt-4 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handlePassword(e)}
                    />

                    <input
                      type={passwordType}
                      id="confirm_password"
                      className="rounded-none rounded-r-lg mt-4 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => handleConfirmPassword(e)}
                    />
                    <span className="text-rose-600">{pswMsg}</span>

                    <div className="flex items-center my-4">
                      <input
                        id="displayPassword"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={togglePassword}
                      />
                      <label
                        htmlFor="displayPassword"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs"
                      type="button"
                      onClick={() => handleCloseModal()}
                    >
                      Close
                    </button>
                    <button
                      className={`${
                        passwordBtn === false ? "text-gray-50" : "text-gray-300"
                      } ${
                        passwordBtn === false ? "bg-green-600" : "bg-rose-600"
                      }  rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs`}
                      type="button"
                      disabled={passwordBtn}
                      onClick={(e)=>handleUpdatePassword(e)}
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {/* Update Password Modal End */}

        {/* Update Password Modal */}
        {showLogoutModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">Attention</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p>
                      Your Profile Successfully Updated. Please Login Again Your
                      Account.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className={`text-gray-100 bg-green-600 rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs cursor-pointer`}
                      type="button"
                      onClick={(e) => handleLogout(e)}
                    >
                      Please Login Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {/* Update Password Modal End */}
      </Layout>
    </>
  );
};

export default Profile;
