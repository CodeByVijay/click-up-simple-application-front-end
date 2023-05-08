import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Select from "react-select";
import axios from "axios";
import { base_path } from "../App";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { MainContextState } from "../contexts/MainContext";

const Project = () => {
  const { users, userList, setUserList } = useContext(MainContextState);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [joinedMembers, setJoinedMembers] = useState([]);

  const options = userList
    ? userList.map((user) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  useEffect(() => {
    getProject();
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "gray" : "black",
      // backgroundColor:state.isDisabled ? "blue" : "white",
    })
  };

  const getProject = async () => {
    await axios
      .post(`${base_path}project`, { id: id })
      .then((resp) => {
        const members = JSON.parse(resp.data.result[0].members);
        const memberIds = members.map((member) => member.value);

        setJoinedMembers(memberIds);
        setProject(resp.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  const isOptionDisabled = (option) => {
    return joinedMembers.includes(option.value);
  };

  const handleAddMemberModelOpen = () => {
    setMsg("");
    setMsgColor("");
    setSelectedUserList([]);
    setShowAddMemberModal(true);
  };

  const handleCloseModal = () => {
    setShowAddMemberModal(false);
  };
  const handleUserSelect = (selectedOptions) => {
    setSelectedUserList(selectedOptions);
  };

  const handleMember = (e, member_id) => {
    console.log(member_id);
  };
  const handleAddMemberProject = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <>
      <Layout>
        <div className="container">
          <div className="head my-3 text-center">
            <h4 className="font-black text-lg">
              {project.length > 0 ? project[0].project_name : ""}
            </h4>
          </div>

          <hr />
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="partOne bg-gray-50 m-3 ">
              <div className="partOneHead my-4 font-bold pl-4">
                Project Info
                <button className="float-right bg-blue-500 text-white p-2 rounded-lg mr-3 hover:bg-blue-700">
                  <FaPencilAlt />
                </button>
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
              </div>
            </div>
            <div className="partTwo bg-gray-50 m-3">
              <div className="partTwoHead my-4 font-bold pl-4">
                Members
                <button
                  className="float-right bg-blue-500 text-white p-2 rounded-lg mr-3 hover:bg-blue-700"
                  onClick={handleAddMemberModelOpen}
                >
                  <FaPlus />
                </button>
              </div>
              <hr />
              <div className="pl-4 my-4">
                <ul className="list-outside list-decimal pl-4">
                  {project.length > 0 &&
                    project[0].members !== null &&
                    JSON.parse(project[0].members).map((val, i) => {
                      // console.log(val,"sad")
                      return (
                        <>
                          <li key={i + 1} className="m-2">
                            <div className="items grid grid-cols-2">
                              <p>{val.label}</p>
                              <p className="text-right mr-5">
                                <button
                                  className="bg-rose-500 text-white p-2 rounded-lg mb-2"
                                  onClick={(e) => handleMember(e, val.value)}
                                >
                                  <FaTrash />
                                </button>
                              </p>
                            </div>
                          </li>
                          <hr className="w-full" />
                        </>
                      );
                    })}
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
                    Add New Member
                  </h3>
                  <span className={`text-${msgColor}`}>{msg}</span>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <Select
                    className="mt-2"
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
    </>
  );
};

export default Project;
