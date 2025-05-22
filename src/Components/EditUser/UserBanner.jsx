import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import userAPI from "../../Service/userApi.service";
import Loader from "../../Common/Loader";
import UTILITY from "../../utils";
import { MdEdit } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import { FaVideo } from "react-icons/fa";
import UploadVideoModal from "../../Channel/UploadVideoModal/UploadVideoModal";

const UserBanner = ({ getUserDetails, editType, setEditType }) => {
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const avatarImageRef = useRef(null);
  const [uploadVideoModal, setUploadVideoModal] = useState(false)
  const handleBannerImage = (img) => {
    setIsLoading(true);
    if (img) {
      const formData = new FormData();
      formData.append("coverImage", img);
      userAPI
        .updateCoverImage(formData)
        .then((res) => {
          setIsLoading(false);
          getUserDetails();
        })
        .catch((error) => {
          UTILITY.TOST("error", error.message);
          setIsLoading(false);
        });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleAvatarChange = (img) => {
    setIsLoading(true);
    if (img) {
      const formData = new FormData();
      formData.append("avatar", img);
      userAPI
        .updateAvatarImage(formData)
        .then((res) => {
          setIsLoading(false);
          getUserDetails();
        })
        .catch((error) => {
          UTILITY.TOST("error", error.message);
          setIsLoading(false);
        });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleButtonClick = () => {
    setEditType(editType == "edit-user" ? "edit-channel" : "edit-user");
  };
  return (
    <div
      className="w-full h-48 bg-white flex items-center justify-center bg-opacity-20 bg-cover bg-center object-cover relative"
      style={{ backgroundImage: `url(${user?.coverImage})` }}
    >
      {isLoading && <Loader />}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleBannerImage(e.target.files[0])}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="bg-[#ae7aff] opacity-40 hover:opacity-85 text-white font-semibold p-2 rounded-md"
      >
        <img src="/icons/upload.svg" className="h-10 w-10" alt="upload" />
      </button>

      <div className="-bottom-24 absolute w-[calc(100%-4.5rem)] flex justify-between items-center left-10">
        <div className="flex items-center">
          <div
            className="h-36 w-36 flex items-center justify-center border rounded-full bg-cover   bg-gray-500"
            style={{
              backgroundImage: `url(${user?.avatar})`,
            }}
          >
            <input
              type="file"
              accept="image/*"
              ref={avatarImageRef}
              className="hidden"
              onChange={(e) => handleAvatarChange(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => avatarImageRef.current.click()}
              className="bg-[#ae7aff] opacity-40 hover:opacity-85 text-white font-semibold p-2 rounded-md"
            >
              <img src="/icons/upload.svg" className="h-10 w-10" alt="upload" />
            </button>
          </div>
          <div className="flex flex-col mt-7 ml-2 ">
            <span className="font-semibold text-2xl">{user?.fullName}</span>
            <span className="opacity-75 font-light">@{user?.userName}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editType === "edit-channel" && (
            <button className="mr-1 w-full flex items-center gap-2 bg-[#ae7aff] mt-10 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto" onClick={()=>setUploadVideoModal(true)}>
              {" "}
              <FaVideo className="text-xl" />
              Upload Video
            </button>
          )}
          <button
            className="mr-1 w-full bg-[#ae7aff] flex items-center gap-1 mt-10 px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
            onClick={() => handleButtonClick()}
          >
            {editType === "edit-user" ? (
              <TbDeviceTvOld className="text-xl" />
            ) : (
              <MdEdit className="text-2xl" />
            )}

            {editType === "edit-user" ? "View Channel" : "Edit User"}
          </button>
        </div>
      </div>
      <UploadVideoModal isModalOpen={uploadVideoModal} setIsModalOpen={setUploadVideoModal}/>
    </div>
  );
};

export default UserBanner;
