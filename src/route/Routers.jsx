import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NoPage from "../pages/NoPage";
import Public from "./Public";
import Protected from "./Protected";
import Logout from "../pages/auth/Logout";
import Groups from "../pages/Groups";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Public />}>
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
