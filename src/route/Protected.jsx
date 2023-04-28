import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { MainContextState } from "../contexts/MainContext";

const Protected = () => {
  const {loginCehck}= useContext(MainContextState)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!loginCehck){
      navigate('/login')
    }
  },[])
  return (
    <Outlet />
  )
}

export default Protected
