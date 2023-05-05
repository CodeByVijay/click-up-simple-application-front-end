import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_path } from "../App";
import Select from "react-select";
import { MainContextState } from "../contexts/MainContext";

const Task = () => {
  const { users, userList, setUserList } = useContext(MainContextState);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [task, setTask] = useState([]);
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  useEffect(() => {
    axios
      .get(`${base_path}task/${id}`)
      .then((res) => {
        setTask(res.data.result);
        setSelectedStatus({
          value: res.data.result[0].status,
          label: res.data.result[0].status.toUpperCase(),
        });
        setLoader(false);
        console.log(selectedStatus);
      })
      .catch((err) => {
        console.log(err, "Err");
      });

    getUserList();
  }, []);

  //   Get all users
  const getUserList = () => {
    axios
      .get(`${base_path}user-list`)
      .then((resp) => {
        // console.log(resp.data.result, "response");
        setUserList(resp.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  const options = userList
    ? userList.map((user) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  const taskStatus = [
    {
      value: "assigned",
      label: "Assigned",
    },
    {
      value: "in-progress",
      label: "In Progress",
    },
    {
      value: "completed",
      label: "Complete",
    },
  ];

  const handleUserSelect = (selectedOptions) => {
    // console.log(selectedOptions)
    setSelectedUserList(selectedOptions);
  };
  const handletaskStatus = (selectedOptions) => {
    setSelectedStatus(selectedOptions);
  };

  const handleStatusModelOpen = () => {
    setMsg("");
    setMsgColor("");
    setSelectedUserList([]);
    setShowStatusModal(true);
  };

  const handleCloseModal = () => {
    setShowStatusModal(false);
  };
  const handleChangeStatus = (e) => {
    e.preventDefault();
    const statusData = {
      task_id: id,
      status: selectedStatus.value,
    };
    axios
      .post(`${base_path}task-status-change`, statusData)
      .then((res) => {
        setMsg(res.data.msg)
        setMsgColor("green-700")
       setShowStatusModal(false)
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });

    // console.log(statusData)
  };

  return (
    <>
      <Layout>
        {!loader && (
          <>
            <div className="container">
              <div className="grid grid-cols-3 gap-3">
                <div
                  className={`taskGrid col-span-2 h-full bg-gray-100 px-10 py-5 hover:bg-gray-200 rounded-lg`}
                >
                  <div className="text-center font-black text-lg border-blue-300 border-b-2 p-2 hover:border-blue-400 my-4">
                    <h4>Task Details</h4>
                  </div>
                  <span className={`text-${msgColor}`}>{msg}</span>

                  <div className="action m-3 p-2 grid grid-cols-2 gap-3">
                    <div className="changeStatus text-left">
                      <button
                        className="p-2 bg-green-600 hover:bg-green-700 text-white hover:text-gray-50 rounded-lg"
                        onClick={handleStatusModelOpen}
                      >
                        {" "}
                        Change Status
                      </button>
                    </div>
                    <div className="assignTask text-right">
                      <button className="p-2 bg-green-600 hover:bg-green-700 text-white hover:text-gray-50 rounded-lg">
                        {" "}
                        Assign Task
                      </button>
                    </div>
                  </div>

                  <div className="details justify-start shadow-md shadow-gray-300 m-3 p-5">
                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black">Task : </label>
                      </div>
                      <div>
                        <span>{task[0].task_name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black">
                          Task Description :{" "}
                        </label>
                      </div>
                      <div>
                        <span>{task[0].task_desc}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black">
                          Expected Date & Time :
                        </label>
                      </div>
                      <div>
                        <span>{task[0].expected_date_time}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black">Assing : </label>
                      </div>
                      <div>
                        <span>{task[0].assignFrom}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black">Status : </label>
                      </div>
                      <div>
                        <span>{task[0].status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 my-2">
                      <div>
                        <label className="font-black">Comments : </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 rounded-lg bg-blue-50 border-blue-100 border-2 m-2">
                      <div className="flex p-3 m-4">
                        <div className="avatar rounded-xl shadow-xl shadow-blue-800">
                          <img
                            src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_1280.png"
                            alt=""
                            width={`48px`}
                            height={`48px`}
                          />
                        </div>
                        <div className="name mt-4 ml-4 font-medium">
                          <p>KHJUdsfsdfsdklhfdslkf</p>
                        </div>
                      </div>
                      <div className="comments px-5">
                        fdjsdf sdfkjsdf sdf;sdf sdfsdf;lsdf slfjdsf sdflsdfjsdf
                        lsdfjsd
                      </div>
                    </div>

                    <div className="grid grid-cols-1 my-2">
                      <div>
                        <label
                          for="message"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Write Comment
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your comment here..."
                        ></textarea>
                      </div>
                      <div className="button text-right">
                        <button className="p-3 m-2 bg-green-600 hover:bg-green-700 text-white hover:text-gray-50 rounded-lg">
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`projectGrid h-full bg-rose-100 rounded-lg px-10 py-5`}
                >
                  <div className="text-center font-black text-lg border-blue-300 border-b-2 p-2 my-4">
                    <h4>Project Details</h4>
                  </div>

                  <div className="details justify-start shadow-md shadow-gray-300 m-3 p-5">
                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black text-sm">
                          Project Name :{" "}
                        </label>
                      </div>
                      <div>
                        <span className="text-sm">{task[0].project_name}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black text-sm">
                          Project Manager :{" "}
                        </label>
                      </div>
                      <div>
                        <span className="text-sm">
                          {task[0].project_manager}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black text-sm">
                          Project Status :{" "}
                        </label>
                      </div>
                      <div>
                        <span>
                          {task[0].project_status === 0 ? (
                            <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                              Progress
                            </span>
                          ) : (
                            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                              Completed
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 my-2">
                      <div>
                        <label className="font-black text-sm">
                          Team Members :{" "}
                        </label>
                      </div>
                      <div className="text-sm">
                        <ol className="list-inside list-decimal">
                          {JSON.parse(task[0].project_members).map(
                            (member, i) => {
                              return (
                                <>
                                  <li key={i}>{member.label}</li>
                                </>
                              );
                            }
                          )}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Change Status Modal */}
        {showStatusModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">
                      Change Status
                    </h3>
                    <span className={`text-${msgColor}`}>{msg}</span>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <Select
                      className="mt-2"
                      closeMenuOnSelect={true}
                      isMulti={false}
                      searchable={true}
                      options={taskStatus}
                      onChange={handletaskStatus}
                      value={selectedStatus}
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
                      onClick={(e) => handleChangeStatus(e)}
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
        {/* Change Status Modal End */}

        {/* Assign Task Modal */}
        {/* {showStatusModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">
                      Change Status
                    </h3>
                    <span className={`text-${msgColor}`}>{msg}</span>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <Select
                      className="mt-2"
                      closeMenuOnSelect={true}
                      isMulti={false}
                      searchable={true}
                      options={options}
                      onChange={handleUserSelect}
                      value={selectedUserList}
                      placeholder="Assign Task"
                    />
                  </div>
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
                      onClick={(e) => handleChangeStatus(e)}
                    >
                      Assign Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )} */}
        {/* Assign Task Modal End */}
      </Layout>
    </>
  );
};

export default Task;
