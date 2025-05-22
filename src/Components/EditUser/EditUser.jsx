import React, { useContext, useEffect, useState } from "react";
import userAPI from "../../Service/userApi.service";
import { useNavigate } from "react-router-dom";
import UserBanner from "./UserBanner.jsx";
import { AppContext } from "../../Context/AppContext.jsx";
import EditPersonalDetails from "./EditPersonalDetails.jsx";
import Loader from "../../Common/Loader.jsx";
import EditChannelDetails from "./EditChannelDetails.jsx";
import EditPasswordDetails from "./EditPasswordDetails.jsx";
export const Tab = ({ selectedTab, setSelectedTab, value }) => {
  return (
    <button
      className={` py-2.5 w-full ${selectedTab == value ? " bg-white text-[#ae7aff] border-b-2 border-b-[#ae7aff]" : "text-gray-400"}`}
      onClick={() => setSelectedTab(value)}
    >
      {value}
    </button>
  );
};
const tabs = [
  {
    title: "Personal Information",
    type: "edit-user",
  },
  {
    title: "Channel Information",
    type: "edit-user",
  },
  {
    title: "Change Password",
    type: "edit-user",
  },
  {
    title:"Videos",
    type:"edit-channel"
  },
    {
    title:"Playlist",
    type:"edit-channel"
  },

    {
    title:"Subscribed",
    type:"edit-channel"
  }
];
const EditUser = () => {
  const { user, setUser } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState("Personal Information");
  const [editType, setEditType] = useState("edit-user");
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
useEffect(() => {
 if(editType=="edit-user"){
  setSelectedTab("Personal Information")
 }
 else{
  setSelectedTab("Videos")
 }
}, [editType])

  
  return (
    <div className="w-full ">
      <UserBanner getUserDetails={getUserDetails} editType={editType} setEditType={setEditType} />
      {!user && <Loader />}
      <div className="p-4 w-full">
        <div className="grid mt-32 grid-cols-3 gap-2 w-full border-b py-1">
          {tabs
            .filter((item) => item.type === editType)
            .map((item) => (
              <React.Fragment key={item.title}>
              <Tab
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                value={item.title}
              />
              </React.Fragment>
            ))}
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
