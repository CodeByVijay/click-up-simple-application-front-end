import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import { FaPlus, FaTrash } from "react-icons/fa";
import Select from "react-select";
import { MainContextState } from "../contexts/MainContext";
import axios from "axios";
import { app_url, base_path } from "../App";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const Projects = () => {
  const { users, userList, setUserList, msg, setMsg, msgColor, setMsgColor } =
    useContext(MainContextState);

  const [projectName, setProjectName] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [projectDesc, setProjectDesc] = useState("");
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  //   Get all projects
  axios
    .get(`${base_path}all-projects`)
    .then((resp) => {
      setAllProjects(resp.data.result);
    })
    .catch((error) => {
      console.log(error.response.data.msg);
    });

  const handleModelOpen = () => {
    setMsg("");
    setMsgColor("");
    setSelectedUserList([]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setProjectDesc("");
    setProjectName("");
    setShowModal(false);
  };

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
  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };
  const handleProjectDescription = (e) => {
    setProjectDesc(e.target.value);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const data = {
      admin: users.id,
      project_name: projectName,
      description: projectDesc,
      members: selectedUserList,
      invite_link: app_url + "invite/",
    };
    if (
      projectName === "" ||
      projectDesc === "" ||
      selectedUserList.length == 0
    ) {
      setMsgColor("rose-700");
      setMsg("Please fill all fields.");
      return false;
    }
    axios
      .post(`${base_path}store-project`, data)
      .then((resp) => {
        setMsgColor("green-600");
        setMsg(resp.data.msg);
        setProjectDesc("");
        setProjectName("");
        setTimeout(() => {
          setShowModal(false);
          setMsg("");
          setMsgColor("");
        }, 1000);
      })
      .catch((error) => {
        setMsgColor("rose-700");
        setMsg(error.response.data.msg);
      });
  };

  return (
    <>
      <Layout>
        <div className="container p-3">
          <div className="grid grid-cols-1">
            <div className="text-right">
              <button
                className={`inline-flex gap-2 p-3 m-1 bg-green-600 rounded-lg text-white hover:bg-green-700 hover:text-gray-50`}
                onClick={handleModelOpen}
              >
                <FaPlus className="mt-1" />
                <span className="">Create New Project</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 auto-rows-fr xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2">
            {allProjects.length > 0 &&
              allProjects.map((val, i) => {
                // console.log(val)
                return (
                  <>
                    {val.status === 0 ? (
                      <>
                        <Link key={i} to={`/project/${val.id}`}>
                          <div className="m-2 bg-gray-100 border-2 border-gray-200 p-3 hover:bg-blue-200 h-full overflow-hidden">
                            <div className="text-center">
                              {/* <span className="float-right text-rose-700 px-2 mx-2 cursor-pointer hover:text-lg">
                                <FaTrash />
                              </span> */}
                              <h4 className="font-black first-letter:capitalize ">
                                {val.project_name}
                              </h4>
                              <hr className="my-2" />
                              <div className="data mt-10 grid grid-cols-2">
                                <div className="memberCount">
                                  <p className="float-left">
                                    <span className="font-bold">
                                      Team Members
                                    </span>
                                    <br />
                                    {val.members !== null
                                      ? JSON.parse(val.members).length
                                      : 0}
                                  </p>
                                </div>
                                <div className="manager">
                                  <span className="float-right">
                                    <span className="font-bold">Manager</span>
                                    <br />
                                    {val.admin_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to={`/project/${val.id}`}>
                          <div className="m-2 bg-green-100 border-2 border-gray-200 p-3 hover:bg-green-300 overflow-hidden h-full">
                            <div className="text-center">
                              {/* <span className="float-right text-rose-700 px-2 mx-2 cursor-pointer hover:text-lg">
                                <FaTrash />
                              </span> */}
                              <h4 className="font-black first-letter:capitalize ">
                                {val.project_name}
                              </h4>
                              <hr className="my-2" />
                              <div className="data mt-10 grid grid-cols-2">
                                <div className="memberCount">
                                  <p className="float-left">
                                    <span className="font-bold">
                                      Team Members
                                    </span>
                                    <br />
                                    {val.members !== null
                                      ? JSON.parse(val.members).length
                                      : 0}
                                  </p>
                                </div>
                                <div className="manager">
                                  <span className="float-right">
                                    <span className="font-bold">Manager</span>
                                    <br />
                                    {val.admin_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </>
                    )}
                  </>
                );
              })}
          </div>

          {allProjects.length === 0 && (
            <>
              <div className="text-center">No Project Found.</div>
            </>
          )}
        </div>

        {/*  Project Add Modal */}

        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                    <h3 className="text-3xl mb-2 font-semibold">
                      Add New Project
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <Alert />
                    <input
                      type="text"
                      id="Project_Name"
                      className="rounded-none mt-4 rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Project Name"
                      onChange={(e) => handleProjectName(e)}
                    />

                    <textarea
                      id="project_desc"
                      className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Project Description"
                      onChange={(e) => handleProjectDescription(e)}
                    >
                      {projectDesc}
                    </textarea>

                    <Select
                      className="mt-2"
                      closeMenuOnSelect={false}
                      isMulti={true}
                      searchable={true}
                      options={options}
                      onChange={handleUserSelect}
                      value={selectedUserList}
                      placeholder="Select Members"
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
                      onClick={(e) => handleCreateProject(e)}
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

        {/* Project add modal end */}
      </Layout>
    </>
  );
};

export default Projects;
