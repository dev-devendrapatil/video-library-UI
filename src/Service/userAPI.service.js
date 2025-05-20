import APIService from "./api.service";

const userAPI = {
  registerUser:(payload)=>APIService.post("users/register",payload),
  loginUser:(payload)=>APIService.post("users/login",payload),
  logoutUser:()=>APIService.post("users/logout"),
  updatePassword:(payload)=>APIService.post("users/changePassword",payload),
  getUserDetails:()=>APIService.get("users/userDetails"),
  updateUserDetails:(payload)=>APIService.patch("users/updateUser",payload),
  updateAvatarImage:(formData)=>APIService.patchFormData("users/updateAvatar",formData),
  updateCoverImage:(formData)=>APIService.patchFormData("users/updateCoverImage",formData)
};

export default userAPI;