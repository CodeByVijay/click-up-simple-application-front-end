import { React, createContext, useState } from "react";
export const MainContextState = createContext();

export const MainContext = (props) => {
  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loginCehck, setLoginCheck] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  return (
    <>
      <MainContextState.Provider value={{users, setUsers,loginCehck, setLoginCheck,userList, setUserList,msg, setMsg,msgColor, setMsgColor}}>
        {props.children}
      </MainContextState.Provider>
    </>
  );
};
