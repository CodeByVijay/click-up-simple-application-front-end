import React, { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { loginCehck } from "../App";
const cookies = new Cookies();

const Public = () => {
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
