import { useNavigate } from "react-router-dom";
import UTILITY from "../utils";

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
    const navigate = useNavigate()
  return (
    <div key={id} className="cursor-pointer space-y-2" onClick={()=>navigate(`/video-detail/${id}`)}>
      <div className="w-full aspect-video relative rounded-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded bg-opacity-70">
{UTILITY.formatDuration(duration)}
        </span>
      </div>
      <div className="flex item-center gap-3 pt-1 ">
        <img src={userImage} className="w-11 h-11 rounded-full" />

        <div className="">
          <div className="text-sm font-semibold line-clamp-2">{title}</div>
          <div className="text-xs text-gray-500 "> {owner}</div>
          <div className="text-xs text-gray-500">
            {views} views • {UTILITY.timeAgo(updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridVideoCard;
