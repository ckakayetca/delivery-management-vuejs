import axios from 'axios';
// config

axios.interceptors.request.use(
    function (config) {
        config.withCredentials = true;
        config.baseURL = import.meta.env.VITE_API_URL;

        return config
    },
    function (error) { }
);

export default axios