import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Layout from "./Common/Layout";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import EditUser from "./Components/EditUser/EditUser";
import VideoDetails from "./Components/VideoDetails/VideoDetails";

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/video-detail/:id" element={<VideoDetails/>}/>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
