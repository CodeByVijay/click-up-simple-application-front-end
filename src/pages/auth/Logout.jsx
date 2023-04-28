import React, { useContext } from 'react'
import { Cookies } from "react-cookie";
import { MainContextState } from '../../contexts/MainContext';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();

const Logout = () => {
    const navigate = useNavigate()
    const {setUsers, setLoginCheck } = useContext(MainContextState);
    cookies.remove('access_token')
    cookies.remove('user_data')
    setUsers([])
    setLoginCheck(false);
    navigate('/login')
  return (
    <>
      
    </>
  )
}

export default Logout
