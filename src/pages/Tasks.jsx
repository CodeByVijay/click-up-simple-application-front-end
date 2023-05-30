import React, { useRef, useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { MainContextState } from "../contexts/MainContext";
import axios from "axios";
import { base_path } from "../App";

const Task = ({ task }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable draggableId={task.id} isDragging={isDragging}>
      {(provided, snapshot) => (
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
      )}
    </Draggable>
  );
};

const Tasks = () => {
  const { project_id } = useParams();

  const elRef = useRef();
  const [height, setHeight] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const { users, userList, setUserList } = useContext(MainContextState);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskExpDateTime, setTaskExpDateTime] = useState("");
  const [buttonTxt, setButtonTxt] = useState("Add Task");
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [project, setProject] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getUserList();
    getProjectList();
    getTaskList();

    if (!elRef?.current?.offsetHeight) {
      return false;
    }
    setHeight(elRef?.current?.offsetHeight);
  }, []);
  console.log(height, "height");
  const heightStyle = {
    height: `calc(100vh - 168px)`,
    overflowY:"scroll",
  };

  // console.log(heightStyle, "heightStyle");
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
    // .get(`${base_path}all-projects`)
    axios
      .get(`${base_path}member-projects/${users.id}`)
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
      .get(`${base_path}project-tasks/${project_id}`)
      .then((resp) => {
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
  const options = userList
    ? userList.map((user) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

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
    // console.log(selectedOptions.value)
    setProject(selectedOptions);
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
        setTimeout(() => {
          setShowModal(false);
          setButtonTxt("Add Task");
          getTaskList();
        }, 1500);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  const onDragEnd = (result) => {
    if (result.destination) {
      const task = taskList[result.source.index];
      task.status = result.destination.droppableId;
      setTaskList([
        ...taskList.filter((t, i) => i !== result.source.index),
        task,
      ]);

      const statusData = {
        task_id: task.id,
        status: task.status,
      };
      axios
        .post(`${base_path}task-status-change`, statusData)
        .then((res) => {
          console.log(res.data.msg);
        })
        .catch((error) => {
          console.log(error.response.data.msg);
        });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Layout>
          <div className="addTaskBtn">
            <button
              className="flex gap-2 bg-green-600 hover:bg-green-700 text-white hover:text-gray-50 rounded-md p-3 m-2"
              onClick={handleModelOpen}
            >
              <FaPlus className="mt-1"/> Add New Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3" ref={elRef}>
            <Droppable droppableId="assigned">
              {(provided, snapshot) => (
                // text-center h-screen
                <div
                  className={`assigned taskListBlock bg-yellow-100 rounded-md p-2 ${
                    snapshot.isDraggingOver ? "bg-green-200" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={heightStyle}
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
                                <h3 className="font-black">{task.task_name}</h3>
                                <div className="flex justify-between">
                                  <h3>{task.description.slice(0, 20)}...</h3>
                                  <span
                                    className={`uppercase text-white rounded-full w-10 text-center p-2 text-sm`}
                                    style={{
                                      backgroundColor: `#${Math.floor(
                                        Math.random() * 16777215
                                      ).toString(16)}`,
                                    }}
                                  >
                                    {task.member_name.slice(0, 2)}
                                  </span>
                                </div>
                                <div className="timeLine my-2">
                                  <span className="font-bold">Timeline : </span>{" "}
                                  <span>
                                    {new Date(
                                      task.expected_date_time
                                    ).toLocaleTimeString("en-US", {
                                      day: "numeric",
                                      year: "numeric",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
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
                  className={`in-progress taskListBlock bg-green-100 rounded-md p-2 ${
                    snapshot.isDraggingOver ? "bg-green-200" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={heightStyle}
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
                                <h3 className="font-bold">{task.task_name}</h3>
                                <div className="flex justify-between">
                                  <h3>{task.description.slice(0, 20)}...</h3>
                                  <span
                                    className={`uppercase text-white rounded-full w-10 text-center p-2 text-sm`}
                                    style={{
                                      backgroundColor: `#${Math.floor(
                                        Math.random() * 16777215
                                      ).toString(16)}`,
                                    }}
                                  >
                                    {task.member_name.slice(0, 2)}
                                  </span>
                                </div>

                                <div className="timeLine my-2">
                                  <span className="font-bold">Timeline : </span>{" "}
                                  <span>
                                    {new Date(
                                      task.expected_date_time
                                    ).toLocaleTimeString("en-US", {
                                      day: "numeric",
                                      year: "numeric",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
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
                  className={`completed taskListBlock bg-green-200 rounded-md p-2 ${
                    snapshot.isDraggingOver ? "bg-green-200" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={heightStyle}
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
                                className={`tasks my-2 p-3 bg-green-500 rounded-lg ${
                                  snapshot.isDragging ? "opacity-50" : ""
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <h3 className="font-bold">{task.task_name}</h3>
                                <div className="flex justify-between">
                                  <h3>{task.description.slice(0, 20)}...</h3>
                                  <span
                                    className={`uppercase text-white rounded-full w-10 text-center p-2 text-sm`}
                                    style={{
                                      backgroundColor: `#${Math.floor(
                                        Math.random() * 16777215
                                      ).toString(16)}`,
                                    }}
                                  >
                                    {task.member_name.slice(0, 2)}
                                  </span>
                                </div>

                                <div className="timeLine my-2">
                                  <span className="font-bold">Timeline : </span>{" "}
                                  <span>
                                    {new Date(
                                      task.expected_date_time
                                    ).toLocaleTimeString("en-US", {
                                      day: "numeric",
                                      year: "numeric",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
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
                        value={taskName}
                      />

                      <textarea
                        type="text"
                        id="Task_desc"
                        className="rounded-none rounded-r-lg mt-2 bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Task Description"
                        onChange={(e) => handleTaskDescription(e)}
                        value={taskDesc}
                      >
                        {taskDesc}
                      </textarea>
                      <Select
                        className="mt-2"
                        closeMenuOnSelect={true}
                        isMulti={false}
                        searchable={true}
                        options={projectOptions}
                        onChange={(e) => handleProjectSelection(e)}
                        value={project}
                        placeholder="Select Project"
                      />

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
