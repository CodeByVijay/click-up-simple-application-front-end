import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import { MainContextState } from "../contexts/MainContext";
import axios from "axios";
import { base_path } from "../App";

const Tasks = () => {
    const [showModal, setShowModal] = useState(false);
    const { users, userList, setUserList } = useContext(MainContextState);
    const [selectedUserList, setSelectedUserList] = useState([]);
    const [msg, setMsg] = useState("");
    const [msgColor, setMsgColor] = useState("");

    useEffect(() => {
        //   Get all users
        axios
          .get(`${base_path}user-list`)
          .then((resp) => {
            // console.log(resp.data.result, "response");
            setUserList(resp.data.result);
          })
          .catch((error) => {
            console.log(error.response.data.msg);
          });
      }, []);

    const handleModelOpen = () => {
        setMsg("");
        setMsgColor("");
        setSelectedUserList([]);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
    const handleTaskName = (e)=>{

    }
    const handleTaskDescription = (e)=>{
        
    }
      const options = userList
        ? userList.map((user) => ({
            value: user.id,
            label: user.name,
          }))
        : [];

        const handleUserSelect = (selectedOptions) => {
            // console.log(selectedOptions)
            setSelectedUserList(selectedOptions);
          };

          const handleCreateTask =(e)=>{

          }

  return (
    <div>
      <Layout>
        <div className="addTaskBtn">
          <button className="flex gap-2 bg-green-300 rounded-md p-3 m-2" onClick={handleModelOpen}>
            <FaPlus className="mt-1" /> Add New Task
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="assigned bg-yellow-100 rounded-md p-2 text-center h-screen">
            <div className="head my-3 font-semibold">Assigned Task</div>
            <hr />
            <Link to="">
              <div className="tasks my-2 p-3 bg-red-200 rounded-lg">
                <h3>This is test task</h3>
              </div>
            </Link>
          </div>
          <div className="in-progress bg-green-100 rounded-md p-2 text-center h-screen">
            <div className="head my-3 font-semibold">In Progress Task</div>
            <hr />
            <Link to="">
              <div className="tasks my-2 p-3 bg-yellow-200 rounded-lg">
                <h3>This is test task</h3>
              </div>
            </Link>
            <Link to="">
              <div className="tasks my-2 p-3 bg-yellow-200 rounded-lg">
                <h3>This is test task</h3>
              </div>
            </Link>
          </div>
          <div className="completed bg-green-200 rounded-md p-2 text-center h-screen">
            <div className="head my-3 font-semibold">Completed Task</div>
            <hr />

            <Link to="">
              <div className="tasks my-2 p-3 bg-green-500 rounded-lg">
                <h3>This is test task</h3>
              </div>
            </Link>
          </div>
        </div>


        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">
                      Add New Task
                    </h3>
                    <span className={`text-${msgColor}`}>{msg}</span>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      id="Task_Name"
                      className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Task Name"
                      onChange={(e) => handleTaskName(e)}
                    />

                    <input
                      type="text"
                      id="Task_desc"
                      className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Task Description"
                      onChange={(e) => handleTaskDescription(e)}
                    />
                    <Select
                      className="mt-2"
                      closeMenuOnSelect={false}
                      isMulti={true}
                      searchable={true}
                      options={options}
                      onChange={handleUserSelect}
                      value={selectedUserList}
                      placeholder="Assign Task"
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
                      onClick={(e) => handleCreateTask(e)}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}

      </Layout>
    </div>
  );
};

export default Tasks;
