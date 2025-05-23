import APIService from "./api.service"

const videoAPI={
      uploadVideo:(formData)=>APIService.postFormData("videos/newVideo",formData),
      getUserVideo:()=>APIService.get("videos/userVideos"),
      getVideoById:(videoId)=>APIService.get(`videos/video/${videoId}`),
      isUserSubscribed:(channelId)=>APIService.get(`videos/isSubscribed/${channelId}`)

}
export default videoAPI