import React, { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import GridVideoCard from "../../Common/GridVideoCard";
import userAPI from "../../Service/userAPI.service";

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState(null);

  const getAllWatchedVideos = async () => {
    try {
      const res = await userAPI.watchHistory() 
const sortedData = res.data.sort(
  (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
);      setWatchHistory(sortedData);
    } catch (error) {
      console.error("Failed to fetch watch history", error);
      setWatchHistory([]);
    }
  };

  useEffect(() => {
    getAllWatchedVideos();
  }, []);

  return (
    <div className="px-7 py-4 w-full min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4">Watch History</h2>

      {watchHistory?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {watchHistory.map((item) => (
            <GridVideoCard
              key={item.video._id}
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
          <MdHistory size={60} className="mb-4 text-blue-500" />
          <p className="text-lg font-medium">No watch history available yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Videos you watch will appear here for quick access.
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
