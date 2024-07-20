import axios from 'axios'

axios.defaults.withCredentials = true

// config
axios.interceptors.request.use(
    function (config) {
        config.withCredentials = true
        config.baseURL = import.meta.env.VITE_API_URL

        return config
    },
    function (error) {
        return Promise.reject(error)
    },
)

export default axios
