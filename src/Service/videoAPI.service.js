import APIService from "./api.service"

const videoAPI={
      uploadVideo:(formData)=>APIService.postFormData("videos/newVideo",formData),
      getUserVideo:()=>APIService.get("videos/userVideos"),
      getVideoById:(videoId)=>APIService.get(`videos/video/${videoId}`),
      getReactions:(videoId)=>APIService.get(`videos/reaction/${videoId}`)

}
export default videoAPI