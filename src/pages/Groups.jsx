import React from "react";
import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";

const Groups = () => {
  return (
    <div>
      <Layout>
       <div className="container p-3">
        <div className="grid grid-cols-1">
           <div className="text-right">
            <button className="inline-flex gap-2 p-3 m-1 bg-green-600 rounded-lg text-white hover:bg-green-700 hover:text-gray-50"><FaPlus className="mt-1"/><span className="">Create New Group</span></button>
           </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-2">
            <div className="m-2 bg-gray-50 border-2 border-gray-200 p-3">
                <div className="text-center">
                    <h4>Click Up </h4>
                </div>
            </div>

            <div className="m-2 bg-gray-50 border-2 border-gray-200 p-3">
                <div className="text-center">
                    <h4>Click Up </h4>
                </div>
            </div>

            <div className="m-2 bg-gray-50 border-2 border-gray-200 p-3">
                <div className="text-center">
                    <h4>Click Up </h4>
                </div>
            </div>

            <div className="m-2 bg-gray-50 border-2 border-gray-200 p-3">
                <div className="text-center">
                    <h4>Click Up </h4>
                </div>
            </div>
        </div>
       </div>
      </Layout>
    </div>
  );
};

export default Groups;
