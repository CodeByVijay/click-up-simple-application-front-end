import {React,useContext} from "react";
import Layout from "../components/Layout";
import { MainContextState } from "../contexts/MainContext";



const Dashboard = () => {
  const { users } = useContext(MainContextState);
  // console.log(users)
  return (
    <>
      <Layout>
        <div className="">Dashboard</div>
      </Layout>
    </>
  );
};

export default Dashboard;
