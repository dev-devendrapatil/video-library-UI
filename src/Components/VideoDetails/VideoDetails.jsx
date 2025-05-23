import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import videoAPI from "../../Service/videoAPI.service";
import UTILITY from "../../utils";
import Loader from "../../Common/Loader";
import subscriptionAPI from "../../Service/subscription.service";
import APIService from "../../Service/api.service";

// const UTILITY = {
//   timeAgo: (date) => "2 days ago", // Dummy formatter
// };

const video = {
  videoFile: "https://www.w3schools.com/html/mov_bbb.mp4",
  title: "Amazing Nature Documentary",
  description: "Explore the beauty of nature in this stunning documentary.",
  views: 15432,
  updatedAt: new Date(),
  owner: {
    userName: "NatureChannel",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    _id: "123",
  },
};

const relatedVideos = [
  {
    _id: "1",
    thumbnail: "https://placehold.co/300x200",
    title: "Wildlife of Africa",
    duration: "12:34",
    views: 8971,
    updatedAt: new Date(),
    owner: { userName: "WildLifeXP" },
  },
  {
    _id: "2",
    thumbnail: "https://placehold.co/300x200",
    title: "Underwater World Secrets",
    duration: "08:45",
    views: 6532,
    updatedAt: new Date(),
    owner: { userName: "OceanLife" },
  },
  {
    _id: "3",
    thumbnail: "https://placehold.co/300x200",
    title: "Mountains of the Himalayas",
    duration: "15:27",
    views: 10345,
    updatedAt: new Date(),
    owner: { userName: "PeakVibes" },
  },
];

const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { id } = useParams();
  const getVideoDetails = (videoId) => {
    videoAPI.getVideoById(videoId).then((res) => {
        if(res.statusCode!==200){
            return UTILITY.TOST("error",res.message)
        }
      setVideoDetails(res.data);
      isUserSubscribed(res.data.owner._id)
    });
  };
  const isUserSubscribed = (channelId)=>{
    videoAPI.isUserSubscribed(channelId).then((res)=>{
      setIsSubscribed(res.data.isSubscribed)
    })
  }
  const handleSubscribeToggle = (userId)=>{
    subscriptionAPI.toggleChannelSubscribe(userId).then((res)=>{
      if(res.statusCode!==200){
       return  UTILITY.TOST("error",res.message)
      }
      isUserSubscribed(videoDetails.owner._id)
    })
  }
  const handleShare=()=>{
        const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
    UTILITY.TOST("success","URL copied")
  }
  useEffect(() => {
    if (id) {
      getVideoDetails(id);
    }
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row px-6 py-4 gap-6">
        {!videoDetails&&<Loader/>}
     {
        videoDetails&&  <div className="flex-1">
        <div className="w-full h-[400px] bg-black mb-4 rounded-sm overflow-hidden">
          <video
            controls
            className="w-full h-full object-cover"
            src={videoDetails.videoFile}
          />
        </div>
        <div className="p-4 border rounded-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xl font-semibold">{videoDetails.title}</div>
              <div className="text-sm text-gray-200 mb-2">
                {videoDetails.views} views • {UTILITY.timeAgo(videoDetails.createdAt)}
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Like/Dislike Group */}
              <div className="flex items-center bg-black border rounded-full text-white overflow-hidden">
                <button className="px-4 py-2 text-sm hover:bg-gray-800 border-r border-gray-700 flex items-center gap-1">
                  👍 <span>1.2K</span>
                </button>
                <button className="px-4 py-2 text-sm hover:bg-gray-800 flex items-center gap-1">
                  👎 <span>123</span>
                </button>
              </div>

              {/* Share */}
              <button className="bg-black border px-4 py-2 rounded-full text-sm hover:bg-gray-800 text-white" onClick={()=>handleShare()}>
                🔗 Share
              </button>

              {/* Save */}
              <button className="bg-black border px-4 py-2 rounded-full text-sm hover:bg-gray-800 text-white">
                💾 Save
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src={videoDetails.owner.avatar}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div>
                <div className="text-sm font-semibold">
                  {videoDetails.owner.userName}
                </div>
                <div className="text-xs text-gray-500">{videoDetails.subscriberCount} subscribers</div>
              </div>
            </div>
     <button
  onClick={()=>handleSubscribeToggle(videoDetails.owner._id)}
  className={`px-4 py-2 text-sm rounded-full ${
   isSubscribed
      ? "border text-white"
      : "bg-[#ae7aff] text-white"
  }`}
>
  {isSubscribed? "Unsubscribe" : "Subscribe"}
</button>
          </div>

          <div className=" text-sm whitespace-pre-line">
            {videoDetails.description}
          </div>
        </div>
      </div>
      }
    
      {/* Related Videos */}
      <div className="w-full lg:w-96 space-y-4">
        <div className="text-lg font-semibold mb-2">Related Videos</div>
        {relatedVideos.map((item) => (
          <div key={item._id} className="flex gap-3 cursor-pointer">
            <div className="w-40 h-24 relative rounded-md overflow-hidden">
              <img
                src={item.thumbnail}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded bg-opacity-70">
                {item.duration}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold line-clamp-2">
                {item.title}
              </div>
              <div className="text-xs text-gray-500">{item.owner.userName}</div>
              <div className="text-xs text-gray-500">
                {item.views} views • {UTILITY.timeAgo(item.updatedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VideoDetails;
