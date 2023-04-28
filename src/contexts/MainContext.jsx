import { React, createContext, useState } from "react";
export const MainContextState = createContext();

export const MainContext = (props) => {
  const [users, setUsers] = useState([]);
  const [loginCehck, setLoginCheck] = useState(false);
  return (
    <>
      <MainContextState.Provider value={{users, setUsers,loginCehck, setLoginCheck}}>
        {props.children}
      </MainContextState.Provider>
    </>
  );
};
