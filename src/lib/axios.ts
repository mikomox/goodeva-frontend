import axios from 'axios';

export const API_KEY_STORAGE_KEY = 'todo_api_key';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
    const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('auth:unauthorized'));
        }
        return Promise.reject(error);
    }
);
