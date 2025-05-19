
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(response.statusText);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  return response.json();
};

const APIService = {
  get: (url, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: defaultHeaders,
      ...options,
    }).then(handleResponse),

  post: (url, data = {}, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(data),
      ...options,
    }).then(handleResponse),

  put: (url, data = {}, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(data),
      ...options,
    }).then(handleResponse),

  patch: (url, data = {}, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify(data),
      ...options,
    }).then(handleResponse),

  delete: (url, options = {}) =>
    fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: defaultHeaders,
      ...options,
    }).then(handleResponse),
};

export default APIService;
