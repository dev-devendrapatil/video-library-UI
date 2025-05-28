import React, { useState, useEffect } from "react";
import VideoCard from "../../Common/VerticalVideoCard";
import userAPI from "../../Service/userAPI.service";
import { useParams } from "react-router-dom";
import Loader from "../../Common/Loader";
import subscriptionAPI from "../../Service/subscription.service";

const SubscribedChannelDetails = () => {
  const [channel, setChannel] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [totalSubscriber, setTotalSubscriber] = useState(0)
  const [videos, setVideos] = useState([]);
  
  const { id } = useParams();
  const getChannelDetails = (id) => {
    userAPI.getChannelDetails(id).then((res) => {
      if (res.statusCode === 200) {
        setChannel(res.data);
        setVideos(res.data.videos);
      }
    });
  };
  const isChannelSubscribed=()=>{
    subscriptionAPI.isUserSubscribed(id).then((res)=>{
        if(res.statusCode==200){
            setIsSubscribed(res.data.isSubscribed)
            setTotalSubscriber(res.data.totalSubscriber)
        }
    })
  }
  const handleSubscribeToggle = () => {
    subscriptionAPI.toggleChannelSubscribe(id).then((res) => {
      if (res.statusCode !== 200) {
        return UTILITY.TOST("error", res.message);
      }
      isChannelSubscribed(id);
    });
  };
  useEffect(() => {
    if (id) {
      getChannelDetails(id);
      isChannelSubscribed(id)
    }
  }, [id]);


  if (!channel) {
    return <div className="text-gray-400 text-center mt-20">Loading...</div>;
  }

  return (
    <div className="px-6 py-4 w-full">
      {/* Channel Header */}
      {
        !channel&&<Loader/>
      }
      {
        channel&&   <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div className="flex items-center gap-4">
          <img
            src={channel.avatar}
            alt="Channel Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <div className="text-xl font-semibold text-white">
              {channel.userName}
            </div>
            <div className="text-sm text-gray-400">
              {totalSubscriber} subscriber
              {totalSubscriber !== 1 && "s"}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubscribeToggle}
          className={`px-4 py-2 text-sm rounded-full ${
            isSubscribed ? "border text-white" : "bg-[#ae7aff] text-white"
          }`}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </button>
      </div>

      }
   
      {/* Videos */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Videos</h2>
        {videos.length === 0 ? (
          <div className="flex flex-col items-center text-gray-400 mt-10">
            <span className="text-4xl mb-2">📭</span>
            <span>This channel has no videos yet.</span>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                id={video._id}
                thumbnail={video.thumbnail}
                duration={video.duration}
                title={video.title}
                owner={channel.userName}
                views={video.views}
                updatedAt={video.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribedChannelDetails;
