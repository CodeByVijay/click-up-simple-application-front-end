import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
export const allRoutes = [
  {
    path: "",
    element: <Login />,
    title: "login",
  },
  {
    path: "register",
    element: <Register />,
    title: "register",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    title: "home",
  },
  
];
