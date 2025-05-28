import APIService from "./api.service"

const likeAPI = {
      postReactions : (videoId,payload)=>APIService.post(`like/reaction/${videoId}`,payload),
      getLikeVideos : ()=>APIService.get(`like/videos`)

}
export default likeAPI