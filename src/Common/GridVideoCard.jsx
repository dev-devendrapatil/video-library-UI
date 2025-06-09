import { useNavigate } from "react-router-dom";
import UTILITY from "../utils";
import { BsDot } from "react-icons/bs";

const GridVideoCard = ({
  id,
  thumbnail,
  duration,
  title,
  owner,
  views,
  updatedAt,
  userImage,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col space-y-3 w-full" 
      onClick={() => navigate(`/video-detail/${id}`)}
    >
      {/* Thumbnail Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
          {UTILITY.formatDuration(duration)}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img 
            src={userImage} 
            className="w-9 h-9 rounded-full object-cover hover:scale-110 transition-transform duration-200" 
            alt={owner}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold line-clamp-2 leading-5 text-white/90 hover:text-white">
            {title}
          </h3>
          <div className="mt-1 flex flex-col text-[13px] text-gray-400">
            <p className="hover:text-white transition-colors">
              {owner}
            </p>
            <div className="flex items-center">
              <span>{views} views</span>
              <BsDot className="mx-1" />
              <span>{UTILITY.timeAgo(updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridVideoCard;
