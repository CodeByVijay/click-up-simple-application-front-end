import { React, useContext, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { MainContextState } from "../contexts/MainContext";
import axios from "axios";
import { base_path } from "../App";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { users } = useContext(MainContextState);
  const [task, setTask] = useState([]);

  useEffect(() => {
    getMyTask();
  }, []);

  const getMyTask = () => {
    axios
      .get(`${base_path}my-task/${users.id}`)
      .then((res) => {
        console.log(res.data.result);
        setTask(res.data.result);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  };

  return (
    <>
      <Layout>
        <div className="container dark:text-gray-100 bg-gray-50 h-full pb-6 dark:bg-[#1e293b]">
          <div className="head bg-gray-50 dark:bg-blue-400 px-4 py-4 rounded-lg font-black mb-4">
            <h4 className="text-3xl text-center border-b-2 border-gray-300 pb-3 ">My Tasks</h4>
          </div>
          <div className="main w-2/3 m-auto">
            {task.length > 0
              ? task.map((val, i) => {
                  return (
                    <>
                    <Link key={i} to={`/task/${val.id}`}>
                      <div
                        className={`flex px-4 py-3 items-center justify-around my-3 rounded-lg shadow-md ${val.status==='assigned'?'bg-rose-300 shadow-rose-200':val.status==='in-progress'?'bg-[#fbbf24] shadow-amber-300 ':'bg-green-400 shadow-green-300'} `}
                      >
                        <div className="taskName capitalize">Task : {val.task_name}</div>
                        <div className="status capitalize">Project : {val.project_name}</div>
                        <div className="status capitalize">{val.status}</div>
                        
                      </div>
                    </Link>
                    </>
                  );
                })
              : "No Task Assigned."}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
