import { React, useContext, useEffect } from "react";
import Routers from "./route/Routers";
import { Cookies } from "react-cookie";
import { MainContextState } from "./contexts/MainContext";
const cookies = new Cookies();
export const base_path = 'http://localhost:5001/api/'
export const app_url = 'http://localhost:3000/'
function App() {
  const { setLoginCheck,setUsers } = useContext(MainContextState);
  useEffect(() => {
    const token = cookies.get("access_token");
    const userData = cookies.get("user_data");
    if (token !== undefined) {
      setLoginCheck(true);
      setUsers(userData)
    } else {
      setLoginCheck(false);
      setUsers([])
    }
  }, []);
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
