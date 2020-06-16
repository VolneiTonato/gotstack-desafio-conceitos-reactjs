import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {'Content-Type':'application/json'}
});


api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if(error?.response?.data?.message)
    return Promise.reject(error.response.data.message)
  return Promise.reject(error)
})

export default api;
