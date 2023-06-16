import axios from 'axios';

export const API_URL = 'http://localhost:3030';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    validateStatus: function(status) {
        return status < 500
    },
});