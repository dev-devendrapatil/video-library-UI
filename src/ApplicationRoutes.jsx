import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Layout from "./Common/Layout";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import EditUser from "./Components/EditUser/EditUser";
import VideoDetails from "./Components/VideoDetails/VideoDetails";
import LikedVideo from "./Components/LikedVideo/LikedVideo";
import WatchHistory from "./Components/WatchHistory/WatchHistory";
import Subscription from "./Components/Subscriptions/Subscription";
import SubscribedChannelDetails from "./Components/SubscribedChannelDetails/SubscribedChannelDetails";

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
            <Route path="/video-detail/:id" element={<VideoDetails />} />
            <Route path="/likedVideo" element={<LikedVideo />} />
            <Route path="/watchHistory" element={<WatchHistory />} />
            <Route path="/subscriptions" element={<Subscription />} />
            <Route path="/channel/:id" element={<SubscribedChannelDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
