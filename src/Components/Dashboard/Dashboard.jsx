import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import GridVideoCard from '../../Common/GridVideoCard';
import Loader from '../../Common/Loader';
import feedService from '../../Service/feed.service';
import { FaCompass } from 'react-icons/fa';
import { MdTrendingUp, MdWhatshot } from 'react-icons/md';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  const tabs = [
    { id: 'trending', label: 'Trending', icon: <MdTrendingUp className="text-xl" /> },
    { id: 'new', label: 'Latest', icon: <MdWhatshot className="text-xl" /> },
    { id: 'discover', label: 'Discover', icon: <FaCompass className="text-xl" /> },
  ];

  const fetchTopRatedVideos = async (pageNumber = 1, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await feedService.getFeed(pageNumber);
      if (response.success) {
        const newVideos = response.data.docs;
        setVideos(prev => reset ? newVideos : [...prev, ...newVideos]);
        setHasMore(response.data.hasNextPage);
      }
    } catch (error) {
      console.error("Error fetching top-rated videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopRatedVideos(1, true);
    setPage(1);
  }, []);

  const loadMoreVideos = () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    fetchTopRatedVideos(nextPage);
    setPage(nextPage);
  };

  return (
    <div className="flex-1 w-full min-h-screen text-white bg-[#0f0f0f]">
      {/* Top Navigation Tabs */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f] border-b border-gray-800 px-7 py-3">
        <div className="flex items-center space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-[#272727] text-[#ae7aff]' 
                  : 'text-gray-400 hover:text-white'}`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-7 py-6">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreVideos}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center mt-8 mb-4" key="loader">
              <Loader />
            </div>
          }
          threshold={300}
          useWindow={true}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {videos.map(video => (
              <div key={video._id} className="group cursor-pointer hover:transform hover:scale-105 transition-all duration-200">
                <GridVideoCard
                  id={video._id}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  title={video.title}
                  owner={video.owner.userName}
                  views={video.views}
                  updatedAt={video.createdAt}
                  userImage={video.owner.avatar}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Dashboard;
