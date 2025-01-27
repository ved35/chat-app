import axios from "axios";

// Configure Base URL

const Base_URL = "http://localhost:8000";

const axiosInstance = axios.create({
    baseURL: Base_URL,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject((error.response && error.response.data || 'Something went wrong'))
    }
);


export default axiosInstance;