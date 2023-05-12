import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";
import { MainContextState } from "../contexts/MainContext";
import axios from "axios";
import { base_path } from "../App";
import Loader from "./loader/Loader";
import Alert from "../components/Alert";

const Tasks = () => {
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { users, userList, setUserList, msg, setMsg, msgColor, setMsgColor } =
    useContext(MainContextState);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskExpDateTime, setTaskExpDateTime] = useState("");
  const [buttonTxt, setButtonTxt] = useState("Add Task");
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [project, setProject] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getUserList();
    getProjectList();
    getTaskList();
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

  // Get All Projects
  const getProjectList = () => {
    axios
      .get(`${base_path}all-projects`)
      .then((resp) => {
        // console.log(resp.data.result, "response");
        setProjectList(resp.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  // Get all task
  const getTaskList = () => {
    axios
      .get(`${base_path}all-tasks`)
      .then((resp) => {
        // console.log(resp.data.result, "response");
        setTaskList(resp.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  const handleModelOpen = () => {
    setMsg("");
    setMsgColor("");
    setSelectedUserList([]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleTaskName = (e) => {
    setTaskName(e.target.value);
  };
  const handleTaskDescription = (e) => {
    setTaskDesc(e.target.value);
  };
  const handleTaskExpDateTime = (e) => {
    setTaskExpDateTime(e.target.value);
  };

  const projectOptions = projectList
    ? projectList.map((project) => ({
        value: project.id,
        label: project.project_name,
      }))
    : [];

  const handleUserSelect = (selectedOptions) => {
    // console.log(selectedOptions)
    setSelectedUserList(selectedOptions);
  };
  const handleProjectSelection = (selectedOptions) => {
    setLoader(true);
    const project_id = selectedOptions.value;
    setProject(selectedOptions);
    axios
      .get(`${base_path}get-project-members/${project_id}`)
      .then((resp) => {
        const members =
          resp.data.result[0].members !== null
            ? JSON.parse(resp.data.result[0].members)
            : [];
        setProjectMembers(members);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();

    const taskData = {
      task_name: taskName,
      task_desc: taskDesc,
      task_assign: users.id,
      task_assign_user_name: users.name,
      task_assign_to: selectedUserList.value,
      task_assign_to_user_name: selectedUserList.label,
      project_id: project.value,
      project_name: project.label,
      exp_date_time: taskExpDateTime,
    };
    if (
      taskName === "" ||
      taskDesc === "" ||
      selectedUserList === "" ||
      project === "" ||
      taskExpDateTime === ""
    ) {
      setMsg("Please fill all fields.");
      setMsgColor("rose-700");
      return false;
    }
    setButtonTxt("Please wait...");
    setLoader(true);
    axios
      .post(`${base_path}create-task`, taskData)
      .then((resp) => {
        // console.log(resp.data, "response");
        // setUserList(resp.data.result);
        setTaskName("");
        setTaskDesc("");
        setTaskExpDateTime("");
        setSelectedUserList("");
        setProject("");
        getTaskList();
        setTimeout(() => {
          setShowModal(false);
          setButtonTxt("Add Task");
          setLoader(false);
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    console.log(result, "drag & drop");
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const newTaskList = [...taskList];
      const status = parseInt(source.droppableId);
      const [removed] = newTaskList[status].splice(source.index, 1);
      newTaskList[status].splice(destination.index, 0, removed);
      setTaskList(newTaskList);
    } else {
      const sourceStatus = parseInt(source.droppableId);
      const destStatus = parseInt(destination.droppableId);
      const newTaskList = [...taskList];
      const [removed] = newTaskList[sourceStatus].splice(source.index, 1);
      removed.status = destStatus;
      newTaskList[destStatus].splice(destination.index, 0, removed);
      setTaskList(newTaskList);
    }
  };

  // console.log(taskList, "taskList");
  return (
    <>
      {loader && <Loader />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Layout>
          <div className="addTaskBtn">
            <button
              className="flex gap-2 bg-green-600 hover:bg-green-700 text-white hover:text-gray-50 rounded-md p-3 m-2"
              onClick={handleModelOpen}
            >
              <FaPlus className="mt-1" /> Add New Task
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Droppable droppableId="assigned">
              {(provided, snapshot) => (
                <div
                  className={`assigned bg-yellow-100 rounded-md p-2 text-center h-full ${
                    snapshot.isDraggingOver ? "bg-green-200" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="head my-3 font-semibold">Assigned Task</div>
                  <hr />
                  {taskList.map((task, index) => {
                    return (
                      task.status === "assigned" && (
                        <Draggable
                          key={task.id}
                          draggableId={`assigned${task.id.toString()}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Link to={`/task/${task.id}`}>
                              <div
                                className={`tasks my-2 p-3 bg-red-200 rounded-lg ${
                                  snapshot.isDragging ? "opacity-50" : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <h3>{task.task_name}</h3>
                              </div>
                            </Link>
                          )}
                        </Draggable>
                      )
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="in-progress">
              {(provided, snapshot) => (
                <div
                  className={`in-progress bg-green-100 rounded-md p-2 text-center h-full ${
                    snapshot.isDraggingOver ? "bg-green-200" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="head my-3 font-semibold">
                    In Progress Task
                  </div>
                  <hr />
                  {taskList.map((task, index) => {
                    return (
                      task.status === "in-progress" && (
                        <Draggable
                          key={task.id}
                          draggableId={`in-progress${task.id.toString()}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Link to={`/task/${task.id}`}>
                              <div
                                className={`tasks my-2 p-3 bg-yellow-200 rounded-lg ${
                                  snapshot.isDragging ? "opacity-50" : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <h3>{task.task_name}</h3>
                              </div>
                            </Link>
                          )}
                        </Draggable>
                      )
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="completed">
              {(provided, snapshot) => (
                <div
                  className={`completed bg-green-100 rounded-md p-2 text-center h-full ${
                    snapshot.isDraggingOver ? "bg-green-200" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="head my-3 font-semibold">Completed Task</div>
                  <hr />
                  {taskList.map((task, index) => {
                    return (
                      task.status === "completed" && (
                        <Draggable
                          key={task.id}
                          draggableId={`completed${task.id.toString()}`}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Link to={`/task/${task.id}`}>
                              <div
                                className={`tasks my-2 p-3 bg-green-200 rounded-lg ${
                                  snapshot.isDragging ? "opacity-50" : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <h3>{task.task_name}</h3>
                              </div>
                            </Link>
                          )}
                        </Draggable>
                      )
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <Alert />
                      <input
                        type="text"
                        id="Task_Name"
                        className="rounded-none rounded-r-lg mt-4 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Task Name"
                        onChange={(e) => handleTaskName(e)}
                        value={taskName}
                      />
                      <textarea
                        id="Task_desc"
                        className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Task Description"
                        onChange={(e) => handleTaskDescription(e)}
                      >
                        {taskDesc}
                      </textarea>

                      <Select
                        className="mt-2"
                        closeMenuOnSelect={true}
                        isMulti={false}
                        isClearable={false}
                        searchable={true}
                        options={projectOptions}
                        onChange={(e) => handleProjectSelection(e)}
                        value={project}
                        placeholder="Select Project"
                        noOptionsMessage={() => "No projects found."}
                      />

                      <Select
                        className="mt-2"
                        closeMenuOnSelect={true}
                        isMulti={false}
                        isClearable={true}
                        searchable={true}
                        options={projectMembers}
                        onChange={handleUserSelect}
                        value={selectedUserList}
                        placeholder="Assign Task"
                        noOptionsMessage={() => "No members found."}
                      />

                      <div className="my-6">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="Task_date"
                        >
                          Expected Date
                        </label>
                        <input
                          type="datetime-local"
                          id="Task_date"
                          className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Task Expected Date Time"
                          onChange={(e) => handleTaskExpDateTime(e)}
                        />
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
                        className="text-white bg-green-600 rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-sm sm:text-sm text-xs"
                        type="button"
                        onClick={(e) => handleCreateTask(e)}
                      >
                        {buttonTxt}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </Layout>
      </DragDropContext>
    </>
  );
};

export default Tasks;