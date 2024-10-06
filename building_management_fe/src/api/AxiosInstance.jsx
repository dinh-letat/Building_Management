import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8888',
});

const fetchURL = 'http://localhost:8888'

export default AxiosInstance;