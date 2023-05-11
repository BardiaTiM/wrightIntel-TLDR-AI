import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, // include cookies in requests
});

export default axiosInstance;
