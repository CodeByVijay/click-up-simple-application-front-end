import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { base_path } from "../App";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

const Project = () => {
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const { id } = useParams();
  const [project, setProject] = useState([]);
  useEffect(() => {
    axios
      .post(`${base_path}project`, { id: id })
      .then((resp) => {
        setProject(resp.data.result);
      })
      .catch((error) => {});
  }, []);
  //   console.log(project[0].members)

  const handleMember =(e,member_id)=>{
    console.log(member_id)
  }
  return (
    <>
      <Layout>
        <div className="container">
          <div className="head my-3 text-center">
            <h4 className="font-black text-lg">{project.length > 0 ? project[0].project_name : ""}</h4>
          </div>

          <hr />
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="partOne bg-gray-50 m-3 ">
              <div className="partOneHead my-4 font-bold pl-4">
                Project Info
                <button className="float-right bg-blue-500 text-white p-2 rounded-lg mr-3 hover:bg-blue-700"><FaPencilAlt/></button>

              </div>
              <hr />
            <div className="pl-4 my-4">
            <p className="my-2">
                <span className="font-bold">
                  Project Name :{" "}
                </span>
                  {project.length > 0 ? project[0].project_name : ""}
              </p>

              <p className="my-2">
                <span className="font-bold">
                  Project Description :{" "}
                </span>
                  {project.length > 0 ? project[0].description : ""}
              </p>

              <p className="my-2">
                <span className="font-bold">
                  Project Manager :{" "}
                </span>
                  {project.length > 0 ? project[0].admin_name : ""}
              </p>
            </div>
            </div>
            <div className="partTwo bg-gray-50 m-3">
              <div className="partTwoHead my-4 font-bold pl-4">
                Members
                <button className="float-right bg-blue-500 text-white p-2 rounded-lg mr-3 hover:bg-blue-700"><FaPlus/></button>
              </div>
              <hr />
             <div className="pl-4 my-4">
                <ul className="list-outside list-decimal pl-4">
             {project.length > 0 &&
                JSON.parse(project[0].members).map((val, i) => {
                  // console.log(val,"sad")
                  return (
                    <>
                      <li key={i+1} className="m-2">
                        <div className="items grid grid-cols-2">
                            <p>{val.label}</p>
                            <p className="text-right mr-5">
                                <button className="bg-rose-500 text-white p-2 rounded-lg mb-2" onClick={(e)=>handleMember(e,val.value)}><FaTrash/></button>
                            </p>
                        </div>
                      </li>
                      <hr className="w-full"/>
                    </>
                  );
                })}
                </ul>
             </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Project;
