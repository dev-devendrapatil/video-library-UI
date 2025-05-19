const API_BASE_URL = "http://localhost:3000/api/v1/";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const handleResponse = async (response) => {
  return response.json();
};

const APIService = {
  get: (url, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      credentials: "include",
      headers: defaultHeaders,
      ...options,
    }).then(handleResponse),

  post: (url, data = {}, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      credentials: "include",
      headers: defaultHeaders,
      body: JSON.stringify(data),
      ...options,
    }).then(handleResponse),

  put: (url, data = {}, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      credentials: "include",
      headers: defaultHeaders,
      body: JSON.stringify(data),
      ...options,
    }).then(handleResponse),

  patch: (url, data = {}, options = {}, headers) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      credentials: "include",
      headers: defaultHeaders ,
      body: JSON.stringify(data),
      ...options,
    }).then(handleResponse),
  patchFormData: (url, data = {}, options = {}, headers) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "PATCH",
      credentials: "include",
      headers: {},
      body: data,
      ...options,
    }).then(handleResponse),
  delete: (url, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      credentials: "include",
      headers: defaultHeaders,
      ...options,
    }).then(handleResponse),
};

export default APIService;
