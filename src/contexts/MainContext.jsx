import { React, createContext, useState } from "react";
export const MainContextState = createContext();

export const MainContext = (props) => {
  const [users, setUsers] = useState([]);
  return (
    <>
      <MainContextState.Provider value={{users, setUsers}}>
        {props.children}
      </MainContextState.Provider>
    </>
  );
};
