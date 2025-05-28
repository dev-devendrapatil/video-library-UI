import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videoAPI from "../../Service/videoAPI.service";
import UTILITY from "../../utils";
import Loader from "../../Common/Loader";
import subscriptionAPI from "../../Service/subscription.service";
import likeAPI from "../../Service/like.service";
import VideoCard from "../../Common/VerticalVideoCard";
import userAPI from "../../Service/userAPI.service";

// Optional utility if not defined
UTILITY.formatDuration = (duration) => {
  const minutes = Math.floor(duration);
  const seconds = Math.round((duration - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const VideoDetails = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [videoReaction, setVideoReaction] = useState(null);
  const [totalSubscriber, setTotalSubscriber] = useState(0);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getVideoDetails = (videoId) => {
    videoAPI.getVideoById(videoId).then((res) => {
      if (res.statusCode !== 200) {
        return UTILITY.TOST("error", res.message);
      }
      setVideoDetails(res.data);
      isUserSubscribed(res.data.owner._id);
      getRelatedVideo(res.data.owner._id);
    });
  };

  const getRelatedVideo = (channelId) => {
    userAPI.getChannelDetails(channelId).then((res) => {
      if (res.statusCode === 200) {
        const mappedVideos = res.data.videos.map((video) => ({
          _id: video._id,
          thumbnail: video.thumbnail,
          title: video.title,
          duration: UTILITY.formatDuration(video.duration),
          views: video.views,
          updatedAt: video.createdAt,
          owner: {
            userName: res.data.channel?.userName || "Unknown", // Use actual channel data if available
          },
        }));
        setRelatedVideo(mappedVideos.filter((item)=>item._id!==id));
      }
    });
  };

  const isUserSubscribed = (channelId) => {
    subscriptionAPI.isUserSubscribed(channelId).then((res) => {
      setIsSubscribed(res.data.isSubscribed);
      setTotalSubscriber(res.data.totalSubscriber);
    });
  };

  const handleSubscribeToggle = (userId) => {
    subscriptionAPI.toggleChannelSubscribe(userId).then((res) => {
      if (res.statusCode !== 200) {
        return UTILITY.TOST("error", res.message);
      }
      isUserSubscribed(videoDetails.owner._id);
    });
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    UTILITY.TOST("success", "URL copied");
  };

  const getReaction = (id) => {
    videoAPI.getReactions(id).then((res) => {
      if (res.statusCode !== 200) {
        return UTILITY.TOST("error", res.message);
      }
      setVideoReaction(res.data);
    });
  };

  const handleReaction = (reaction) => {
    const payload = { type: reaction };
    likeAPI.postReactions(id, payload).then((res) => {
      if (res.statusCode === 200) {
        getReaction(id);
      }
    });
  };

  useEffect(() => {
    if (id) {
      getVideoDetails(id);
      getReaction(id);
    }
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row px-6 py-4 gap-6">
      {!videoDetails && <Loader />}
      {videoDetails && (
        <div className="flex-1">
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
                <div className="text-xl font-semibold">
                  {videoDetails.title}
                </div>
                <div className="text-sm text-gray-200 mb-2">
                  {videoDetails.views} views •{" "}
                  {UTILITY.timeAgo(videoDetails.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-black border rounded-full text-white overflow-hidden">
                  <button
                    className={`px-4 py-2 text-sm border-r border-gray-700 flex items-center gap-1 hover:bg-gray-800 ${
                      videoReaction?.userReaction === "like"
                        ? "bg-gray-800 font-semibold"
                        : ""
                    }`}
                    onClick={() => handleReaction("like")}
                  >
                    👍 <span>{videoReaction?.likeCount}</span>
                  </button>
                  <button
                    className={`px-4 py-2 text-sm flex items-center gap-1 hover:bg-gray-800 ${
                      videoReaction?.userReaction === "dislike"
                        ? "bg-gray-800 font-semibold"
                        : ""
                    }`}
                    onClick={() => handleReaction("dislike")}
                  >
                    👎 <span>{videoReaction?.dislikeCount}</span>
                  </button>
                </div>
                <button
                  className="bg-black border px-4 py-2 rounded-full text-sm hover:bg-gray-800 text-white"
                  onClick={handleShare}
                >
                  🔗 Share
                </button>
                <a
                  href={videoDetails.videoFile}
                  download
                  target="_blank"
                  className="bg-black border px-4 py-2 rounded-full text-sm hover:bg-gray-800 text-white"
                >
                  💾 Save
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={videoDetails.owner.avatar}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="avatar"
                  onClick={() => navigate(`/channel/${videoDetails.owner._id}`)}
                />
                <div>
                  <div
                    className="text-sm font-semibold cursor-pointer"
                    onClick={() =>
                      navigate(`/channel/${videoDetails.owner._id}`)
                    }
                  >
                    {videoDetails.owner.userName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {totalSubscriber} subscribers
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSubscribeToggle(videoDetails.owner._id)}
                className={`px-4 py-2 text-sm rounded-full ${
                  isSubscribed ? "border text-white" : "bg-[#ae7aff] text-white"
                }`}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>

            <div className="text-sm whitespace-pre-line">
              {videoDetails.description}
            </div>
          </div>
        </div>
      )}

      {/* Related Videos */}
      <div className="w-full lg:w-96 h-screen overflow-y-auto space-y-4">
        <div className="text-lg font-semibold mb-2">Related Videos</div>
        {relatedVideo.map((item) => (
          <VideoCard
            key={item._id}
            id={item._id}
            thumbnail={item.thumbnail}
            duration={item.duration}
            title={item.title}
            owner={item.owner.userName}
            views={item.views}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoDetails;
