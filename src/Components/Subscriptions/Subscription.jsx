import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSubscriptions } from "react-icons/md";
import subscriptionAPI from "../../Service/subscription.service";
import UTILITY from "../../utils";

const Subscription = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);

  const handleSubscribeToggle = (userId) => {
    subscriptionAPI.toggleChannelSubscribe(userId).then((res) => {
      if (res.statusCode !== 200) {
        return UTILITY.TOST("error", res.message);
      }
      getSubscribedChannel();
    });
  };

  const handleViewChannel = (id) => {
    navigate(`/channel/${id}`);
  };

  const getSubscribedChannel = () => {
    subscriptionAPI.getAllSubscribedChannel().then((res) => {
      if (res.statusCode === 200) {
        setChannels(res.data);
      }
    });
  };

  useEffect(() => {
    getSubscribedChannel();
  }, []);

  return (
    <div className="px-6 py-4 w-full min-h-[60vh]">
      <h1 className="text-2xl font-semibold mb-4 text-white">
        Subscribed Channels
      </h1>

      {channels?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 mt-20">
          <MdSubscriptions className="text-6xl text-gray-500 mb-4" />
          <p className="text-lg">You haven’t subscribed to any channels yet</p>
          <p className="text-sm text-gray-500">
            Find channels you love and subscribe to get updates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {channels.map((channel) => (
            <div
              key={channel._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={channel.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {channel.userName}
                  </div>
                  <div className="text-xs text-gray-400">
                    {channel.totalSubscribers} subscribers
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewChannel(channel._id)}
                  className="px-4 py-2 text-sm border rounded-full text-white hover:bg-gray-800"
                >
                  View Channel
                </button>
                <button
                  onClick={() => handleSubscribeToggle(channel._id)}
                  className="px-4 py-2 text-sm rounded-full border text-white hover:bg-red-600"
                >
                  Unsubscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscription;
