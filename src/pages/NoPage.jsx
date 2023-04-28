import React, { useContext, useState } from "react";
import { MainContextState } from "../contexts/MainContext";
import Layout from "../components/Layout";

const NoPage = () => {
  const { loginCehck } = useContext(MainContextState);
  // const [login,setLogin]= useState(loginCehck)
  return (
    <>
      {loginCehck ? (
        <>
          <Layout>
            <h3>Page Not Found.</h3>
          </Layout>
        </>
      ) : (
        <>
          <h3>Page Not Found.</h3>
        </>
      )}
    </>
  );
};

export default NoPage;
