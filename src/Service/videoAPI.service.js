import APIService from "./api.service"

const videoAPI={
      uploadVideo:(formData)=>APIService.postFormData("videos/newVideo",formData),

}
export default videoAPI