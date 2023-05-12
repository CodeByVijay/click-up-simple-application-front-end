import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NoPage from "../pages/NoPage";
import Public from "./Public";
import Protected from "./Protected";
import Logout from "../pages/auth/Logout";
import Projects from "../pages/Projects";
import Project from "../pages/Project";
import Tasks from "../pages/Tasks111";
import Task from "../pages/Task";
import Invite from "../pages/Invite";
import Loader from "../pages/loader/Loader";
import Profile from "../pages/Profile";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" exact element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/task-list" element={<Tasks />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Public />}>
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/invite/:token" element={<Invite />} />
          <Route path="/loader" element={<Loader />} />
        </Route>

        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
