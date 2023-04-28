import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { loginCehck } from '../App'

const Protected = () => {
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
