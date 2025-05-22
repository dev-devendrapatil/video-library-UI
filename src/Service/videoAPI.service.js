import APIService from "./api.service"

const videoAPI={
      uploadVideo:(formData)=>APIService.postFormData("videos/newVideo",formData),
      getUserVideo:()=>APIService.get("videos/userVideos")

}
export default videoAPI