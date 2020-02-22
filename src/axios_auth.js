import axios from 'axios'

const instance = axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization =   token ? `Bearer ${token}` : '';

    return config;
});

// const instance = axios.create({
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization" : `${localStorage.getItem('token')}`,
//     }
// });

export default instance

