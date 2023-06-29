import axios from 'axios';

const options = {
    header : {
        "Content-Type": "application/json",
    },
    baseURL : "http://localhost:4000/api/users",
    responeType : "json",
}

const axiosInstance = axios.create(options);

export default axiosInstance;