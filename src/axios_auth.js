import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `${localStorage.getItem('token')}`,
    }
});

instance = axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization =   token ? `Bearer ${token}` : '';

    return config;
});


export default instance

