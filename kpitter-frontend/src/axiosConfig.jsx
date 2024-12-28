import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Basic ${token}`;
    }
    return config;
});

export default instance;
