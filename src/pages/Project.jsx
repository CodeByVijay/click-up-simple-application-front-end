import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Select from "react-select";
import axios from "axios";
import { app_url, base_path } from "../App";
import { FaArrowLeft, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { MainContextState } from "../contexts/MainContext";
import Loader from "./loader/Loader";
import Alert from "../components/Alert";

const Project = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { users, userList, setUserList, msg, setMsg, msgColor, setMsgColor } =
    useContext(MainContextState);
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showProjectEditModal, setShowProjectEditModal] = useState(false);
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState([]);
  const [joinedMembers, setJoinedMembers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const options = userList
    ? userList.map((user) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  const projectStatus = [
    {
      value: 0,
      label: "Progress",
    },
    {
      value: 1,
      label: "Complete",
    },
  ];

  useEffect(() => {
    setLoader(true);
    getProject();
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "gray" : "black",
      // backgroundColor:state.isDisabled ? "blue" : "white",
    }),
  };

  const getProject = () => {
    setLoader(true);
    axios
      .post(`${base_path}project`, { id: id })
      .then((resp) => {
        const members = JSON.parse(resp?.data?.result[0]?.members);
        const memberIds = members?.map((member) => member.value);

        if (resp?.data?.result[0]?.status === 1) {
          setSelectedProjectStatus({
            value: 1,
            label: "Complete",
          });
        } else {
          setSelectedProjectStatus({
            value: 0,
            label: "Progress",
          });
        }

        setJoinedMembers(memberIds);
        setLoader(false);
        if (resp?.data?.result) {
          setProject(resp.data.result);
        }
      })
      .catch((error) => {
        console.log(error.response?.data?.msg);
      });
  };

  const isOptionDisabled = (option) => {
    return joinedMembers?.includes(option.value);
  };

  const handleAddMemberModelOpen = () => {
    setMsg("");
    setMsgColor("");
    setSelectedUserList([]);
    setShowAddMemberModal(true);
  };

  const handleCloseModal = () => {
    setShowAddMemberModal(false);
    setShowProjectEditModal(false);
  };
  const handleUserSelect = (selectedOptions) => {
    setSelectedUserList(selectedOptions);
  };

  const handleProjectStatus = (selectedOptions) => {
    setSelectedProjectStatus(selectedOptions);
  };

  const handleMember = (e, member_id) => {
    e.preventDefault();
    const postData = {
      project_id: project[0].id,
      admin_id: project[0].admin_id,
      member_id: member_id,
    };
    // console.log(postData);
    axios
      .post(`${base_path}remove-project-member`, postData)
      .then((resp) => {
        getProject();
        setMsg(resp.data.msg);
        setMsgColor("green-600");
      })
      .catch((err) => {
        setMsg(err.response.data.msg);
        setMsgColor("rose-600");
      });
  };
  const handleAddMemberProject = (e) => {
    e.preventDefault();
    setLoader(true);

    // console.log(project,"Project")
    const postData = {
      project_id: project[0].id,
      admin: project[0].admin_id,
      project_name: project[0].project_name,
      members: selectedUserList,
      invite_link: app_url + "invite/",
    };

    axios
      .post(`${base_path}invite-new-member`, postData)
      .then((resp) => {
        setMsg(resp.data.msg);
        setMsgColor("green-600");
        getProject();
        setTimeout(() => {
          setShowAddMemberModal(false);
          setLoader(false);
        }, 1000);
      })
      .catch((err) => {
        setMsg(err.response.data.msg);
        setMsgColor("rose-600");
      });
  };

  // Edit Project
  const hanleProjectEditModal = () => {
    setProjectName(project[0].project_name);
    setProjectDesc(project[0].description);
    setShowProjectEditModal(true);
  };
  const handleProjectName = (e) => {
    setProjectName(e.target.value);
  };
  const handleProjectDescription = (e) => {
    setProjectDesc(e.target.value);
  };

  const handleEditProject = () => {
    setLoader(true);
    const postData = {
      project_id: project[0].id,
      admin_id: project[0].admin_id,
      project_name: projectName,
      description: projectDesc,
      status: selectedProjectStatus.value,
    };

    axios
      .post(`${base_path}edit-project`, postData)
      .then((resp) => {
        setMsg(resp.data.msg);
        setMsgColor("green-600");
        getProject();
        setShowProjectEditModal(false);
        setTimeout(() => {
          setLoader(false);
        }, 1500);
      })
      .catch((err) => {
        setMsg(err.response.data.msg);
        setMsgColor("rose-600");
      });
  };

  // Delete Project
  const handleProjectDelete = () => {
    const project_id = project[0].id;
    setLoader(true);
    axios
      .get(`${base_path}delete-project/${project_id}`)
      .then((resp) => {
        setTimeout(() => {
          navigate("../projects");
          setLoader(false);
        }, 1500);
      })
      .catch((err) => {
        setMsg(err.response.data.msg);
        setMsgColor("rose-600");
      });
  };

  return (
    <>
      {loader && <Loader />}
      <Layout>
        <div className="container dark:text-gray-100 dark:bg-[#1e293b]">
          <div className="head my-3 text-center">
            <button
              className="text-lg float-left"
              onClick={() => navigate(-1)}
              title="Go Back"
            >
              <FaArrowLeft />{" "}
            </button>

            {project[0]?.admin_id === users.id && (
              <span
                className="float-right p-2 bg-rose-500 mr-3 hover:bg-rose-600 text-white rounded-lg"
                title="Delete This Project"
                onClick={handleProjectDelete}
              >
                <FaTrash />
              </span>
            )}
            <h4 className="font-black text-lg">
              {project.length > 0 ? project[0].project_name : ""}
            </h4>

            <Alert />
          </div>

          <hr />
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="partOne bg-gray-50 m-3 dark:bg-[#1e293b] dark:border-2 dark:border-gray-100">
              <div className="partOneHead my-4 font-bold pl-4">
                Project Info
                {project[0]?.admin_id === users.id && (
                  <button
                    className="float-right bg-blue-500 text-white p-2 rounded-lg mr-3 hover:bg-blue-700"
                    onClick={hanleProjectEditModal}
                  >
                    <FaPencilAlt />
                  </button>
                )}
              </div>
              <hr />
              <div className="pl-4 my-4">
                <p className="my-2">
                  <span className="font-bold">Project Name : </span>
                  {project.length > 0 ? project[0].project_name : ""}
                </p>

                <p className="my-2">
                  <span className="font-bold">Project Description : </span>
                  {project.length > 0 ? project[0].description : ""}
                </p>

                <p className="my-2">
                  <span className="font-bold">Project Manager : </span>
                  {project.length > 0 ? project[0].admin_name : ""}
                </p>

                <p className="my-2">
                  <span className="font-bold">Project Status : </span>
                  {project[0]?.status ===0 ? "Pending":"Complete"}
                </p>
              </div>
            </div>
            <div className="partTwo bg-gray-50 m-3 dark:bg-[#1e293b] dark:border-2 dark:border-white">
              <div className="partTwoHead my-4 font-bold pl-4">
                Members
                {project[0]?.admin_id === users.id && (
                  <button
                    className="float-right bg-blue-500 text-white p-2 rounded-lg mr-3 hover:bg-blue-700"
                    onClick={handleAddMemberModelOpen}
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
              <hr />
              <div className="pl-4 my-4">
                <ul className="list-outside list-decimal pl-4">
                  {project[0]?.members !== null &&
                  project[0]?.members.length > 0
                    ? JSON.parse(project[0].members).map((val, i) => {
                        // console.log(val,"sad")
                        return (
                          <>
                            <li key={i + 1} className="m-2">
                              <div className="items grid grid-cols-2">
                                <p>{val.label}</p>

                                {users.id === project[0].admin_id && (
                                  <>
                                    <p className="text-right mr-5">
                                      {project[0]?.admin_id === users.id && (
                                        <button
                                          className="bg-rose-500 text-white p-2 rounded-lg mb-2"
                                          onClick={(e) =>
                                            handleMember(e, val.value)
                                          }
                                        >
                                          <FaTrash />
                                        </button>
                                      )}
                                    </p>
                                  </>
                                )}
                              </div>
                            </li>
                            <hr className="w-full" />
                          </>
                        );
                      })
                    : "No Members Added."}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/*  Project add Member modal */}

      {showAddMemberModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                  <h3 className="text-3xl mb-2 font-semibold">
                    Invite New Member
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Alert />
                  <Select
                    className="mt-4"
                    closeMenuOnSelect={false}
                    isMulti={true}
                    searchable={true}
                    isClearable
                    options={options}
                    onChange={handleUserSelect}
                    value={selectedUserList}
                    isOptionDisabled={isOptionDisabled}
                    placeholder="Select Members"
                    noOptionsMessage={() => "No members found."}
                    styles={customStyles}
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
                    onClick={(e) => handleAddMemberProject(e)}
                  >
                    Add Members
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {/* Project add member modal end */}

      {/*  Project Edit Modal */}

      {showProjectEditModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl h-2/3 w-2/3 md:w-5/6 sm:w-5/6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t w-full text-center">
                  <h3 className="text-3xl mb-2 font-semibold">Edit Project</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Alert />
                  <input
                    type="text"
                    id="Project_Name"
                    className="rounded-none mt-4 rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => handleProjectName(e)}
                  />
                  {/* <input
                    type="text"
                    id="project_desc"
                    className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Project Description"
                    value={projectDesc}
                    onChange={(e) => handleProjectDescription(e)}
                  /> */}

                  <textarea
                    id="project_desc"
                    className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Project Description"
                    onChange={(e) => handleProjectDescription(e)}
                  >
                    {projectDesc}
                  </textarea>
                </div>

                <div className="relative px-6 pb-6 flex-auto">
                  <Select
                    className="mt-2"
                    closeMenuOnSelect={true}
                    isClearable
                    options={projectStatus}
                    onChange={handleProjectStatus}
                    value={selectedProjectStatus}
                    placeholder="Select Project Status"
                    noOptionsMessage={() => "No data found."}
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
                    onClick={(e) => handleEditProject(e)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {/* Project Edit modal end */}
    </>
  );
};

export default Project;
