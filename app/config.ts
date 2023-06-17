import axios from 'axios';

export const API_URL = (process.env.NEXT_PUBLIC_ENV === 'development') ? 'http://localhost:3030': 'https://zylab-api.cyclic.app';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    validateStatus: function(status) {
        return status < 500
    },
});