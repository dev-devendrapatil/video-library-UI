import React, { useEffect, useState } from "react";
import UTILITY from "../../utils";
import videoAPI from "../../Service/videoAPI.service";

const UserVideo = () => {
  const [userVideos, setUserVideos] = useState(null);
  const getUserVideos = () => {
    videoAPI.getUserVideo().then((res) => {
      if (res.statusCode === 200) {
        setUserVideos(res.data);
      } else {
        UTILITY.TOST("error", res.message);
      }
    });
  };
  useEffect(() => {
    getUserVideos();
  }, []);

  return (
    <div className="px-7 py-4 grid grid-cols-3 gap-4">
      {userVideos?.map((item) => (
        <div>
          <div className="w-full h-52 relative">
            <img className="w-full h-full " src={item.thumbnail} />
  
            <span className="absolute bottom-[0.5rem] right-[0.5rem] bg-black py-0.5 px-2 rounded-lg text-xs bg-opacity-65 ">{item.duration}</span>
          </div>
          <div className="text-lg font-semibold capitalize pt-0.5 leading-0">{item.title}</div>
          <div className="text-xs leading-1 ">{item.views} Views . {UTILITY.timeAgo(item.updatedAt)}</div>
        </div>
      ))}
    </div>
  );
};

export default UserVideo;
