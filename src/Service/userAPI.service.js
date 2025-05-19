import APIService from "./api.service";

const userAPI = {
  getAll: () => APIService.get('/users'),

};

export default userAPI;