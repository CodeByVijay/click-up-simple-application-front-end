import React, { useContext, useState } from "react";
import { MainContextState } from "../contexts/MainContext";
import Layout from "../components/Layout";
import { FaPencilAlt } from "react-icons/fa";
import userImage from "../assets/images/user.png"

const Profile = () => {
  const { users, userList, setUserList } = useContext(MainContextState);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  return (
    <>
      <Layout>
        <div className="profile bg-gray-50">
          <div className="head rounded-lg shadow-lg shadow-gray-500 p-5">
            <p className="float-right">
              <button className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <FaPencilAlt />
              </button>
            </p>
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
                    <p>Name : <span className="text-green-600">{users.name}</span></p>
                    <p>Email : <span className="text-green-600">{users.email}</span></p>
                    <p>Status : <span className="text-green-600">{users.status===1?(<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Active</span>):(<span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Block</span>)}</span></p>
                </div>
                <div className="two">
                    <img src={users.avatar?users.avatar:userImage} alt="user image" width="64" height="64"/>
                </div>
            </div>

          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
