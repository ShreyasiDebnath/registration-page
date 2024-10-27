import axios from "axios"

const instance = axios.create({
    baseURL: 'https://registration-page-server.vercel.app/api',
  });
  
  export default instance;