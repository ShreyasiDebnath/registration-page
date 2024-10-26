import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:80/api/auth',
  });
  
  export default instance;