import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NoPage from "../pages/NoPage";
import Public from "./Public";
import Protected from "./Protected";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Public />}>
          <Route path="login" element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
