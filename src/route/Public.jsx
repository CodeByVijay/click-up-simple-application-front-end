import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContextState } from "../contexts/MainContext";

const Public = () => {
    const {loginCehck}= useContext(MainContextState)
  const navigate = useNavigate();

  useEffect(() => {
    if(loginCehck){
        navigate("/dashboard")
    }
  }, []);
  return (
   <Outlet />
  );
};

export default Public;
