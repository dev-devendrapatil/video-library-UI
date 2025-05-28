import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import likeAPI from "../../Service/like.service";
import GridVideoCard from "../../Common/GridVideoCard";

const LikedVideo = () => {
  const [likedVideo, setLikedVideo] = useState(null);

  const getAllLikedVideo = async () => {
    try {
      const res = await likeAPI.getLikeVideos();
      setLikedVideo(res.data);
    } catch (error) {
      console.error("Failed to fetch liked videos", error);
      setLikedVideo([]);
    }
  };

  useEffect(() => {
    getAllLikedVideo();
  }, []);

  return (
    <div className="px-7 py-4 w-full min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4">Liked Videos</h2>

      {likedVideo?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {likedVideo.map((item) => (
            <GridVideoCard
              key={item._id}
              id={item.video._id}
              thumbnail={item.video.thumbnail}
              duration={item.video.duration}
              title={item.video.title}
              owner={item.video.owner.userName}
              views={item.video.views}
              updatedAt={item.video.createdAt}
              userImage={item.video.owner.avatar}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 w-full text-gray-400">
          <AiOutlineHeart size={60} className="mb-4 text-pink-500" />
          <p className="text-lg font-medium">You haven’t liked any videos yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Liked videos will show up here for quick access.
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedVideo;
