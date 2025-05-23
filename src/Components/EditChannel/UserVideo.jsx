import React, { useContext, useEffect, useState } from "react";
import UTILITY from "../../utils";
import videoAPI from "../../Service/videoAPI.service";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const UserVideo = () => {
  const [userVideos, setUserVideos] = useState(null);
  const { uploadedVideo } = useContext(AppContext);
  const navigate = useNavigate();
  const getUserVideos = () => {
    videoAPI.getUserVideo().then((res) => {
      if (res.statusCode === 200) {
        const sortedVideos = res.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setUserVideos(sortedVideos);
      } else {
        UTILITY.TOST("error", res.message);
      }
    });
  };
  const handleVideoClick = (videoId) => {
    navigate(`/video-detail/${videoId}`);
  };
  useEffect(() => {
    getUserVideos();
  }, [uploadedVideo]);
  useEffect(() => {
    console.log(uploadedVideo);
  }, [uploadedVideo]);

  return (
    <div className="px-7 py-4 grid grid-cols-3 gap-4">
      {userVideos?.map((item) => (
        <div>
          <div
            className="w-full h-52 relative"
            onClick={() => handleVideoClick(item._id)}
          >
            <img className="w-full h-full " src={item.thumbnail} />

            <span className="absolute bottom-[0.5rem] right-[0.5rem] bg-black py-0.5 px-2 rounded-lg text-xs bg-opacity-65 ">
              {item.duration}
            </span>
          </div>
          <div className="text-lg font-semibold capitalize pt-0.5 leading-0">
            {item.title}
          </div>
          <div className="text-xs leading-1 ">
            {item.views} Views • {UTILITY.timeAgo(item.updatedAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserVideo;
