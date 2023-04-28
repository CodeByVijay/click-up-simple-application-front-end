import React, { useContext, useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContextState } from "../contexts/MainContext";

const cookies = new Cookies();

const Public = () => {
    const {loginCehck}= useContext(MainContextState)
  const navigate = useNavigate();

  useEffect(() => {
    if(loginCehck){
        navigate("/dashboard")
    }
    // const token = cookies.get("refresh_token");
    // if(token !== undefined){
    //     navigate('dashboard')
    // }
  }, []);
  return (
   <Outlet />
  );
};

export default Public;
