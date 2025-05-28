import { useNavigate } from 'react-router-dom'
import UTILITY from '../utils'

const VerticalVideoCard = ({id,thumbnail,duration,title,owner,views,updatedAt}) => {
  const navigate = useNavigate()
  return (
     <div key={id} className="flex gap-3 cursor-pointer" onClick={()=>navigate(`/video-detail/${id}`)}>
            <div className="w-40 h-24 relative rounded-md overflow-hidden">
              <img
                src={thumbnail}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded bg-opacity-70">
                {duration}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold line-clamp-2">
                {title}
              </div>
              <div className="text-xs text-gray-500">{owner}</div>
              <div className="text-xs text-gray-500">
                {views} views • {UTILITY.timeAgo(updatedAt)}
              </div>
            </div>
          </div>
  )
}

export default VerticalVideoCard