import React, { useContext, useEffect, useState } from "react";
import userAPI from "../../Service/userApi.service";
import { useNavigate } from "react-router-dom";
import UserBanner from "./UserBanner.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
import EditPersonalDetails from "./EditPersonalDetails.jsx";
import Loader from "../../Common/Loader.jsx";
import EditChannelDetails from "./EditChannelDetails.jsx";
import EditPasswordDetails from "./EditPasswordDetails.jsx";

const EditUser = () => {
  const { user, setUser } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState("Personal Information");
  const navigate = useNavigate();
  const getUserDetails = () => {
    userAPI.getUserDetails().then((res) => {
      if (res.statusCode !== 403) {
        setUser(res.data);
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="w-full ">
      <UserBanner getUserDetails={getUserDetails} />
      {!user && <Loader />}
      <div className="p-4 w-full">
      <div className="grid mt-32 grid-cols-3 gap-2 w-full border-b py-1">
        <button
          className={` py-2.5 w-full ${selectedTab == "Personal Information" ? " bg-white text-[#ae7aff] border-b-2 border-b-[#ae7aff]" : "text-gray-400"}`}
          onClick={() => setSelectedTab("Personal Information")}
        >
          Personal Information
        </button>
        <button
          className={` py-2.5 w-full ${selectedTab == "Channel Information" ? " bg-white text-[#ae7aff] border-b-2 border-b-[#ae7aff]" : "text-gray-400"}`}
          onClick={() => setSelectedTab("Channel Information")}
        >
          Channel Information
        </button>

        <button
          className={` py-2.5 w-full ${selectedTab == "Change Password" ? " bg-white text-[#ae7aff] border-b-2 border-b-[#ae7aff]" : "text-gray-400"}`}
          onClick={() => setSelectedTab("Change Password")}
        >
          Change Password
        </button>
      </div>
      {selectedTab === "Personal Information" && user && (
        <EditPersonalDetails getUserDetails={getUserDetails} />
      )}
      {selectedTab === "Channel Information" && user && (
        <EditChannelDetails getUserDetails={getUserDetails} />
      )}
      {selectedTab === "Change Password" && user && (
        <EditPasswordDetails getUserDetails={getUserDetails} />
      )}
      </div>
    </div>
  );
};

export default EditUser;
