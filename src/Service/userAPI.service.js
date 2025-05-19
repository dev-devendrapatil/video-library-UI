import APIService from "./api.service";

const userAPI = {
  getAll: () => APIService.get('/users'),
  registerUser:(payload)=>APIService.post("users/register",payload),
  loginUser:(payload)=>APIService.post("users/login",payload)
};

export default userAPI;