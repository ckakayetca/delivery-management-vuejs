import axios from 'axios'
import router from '../routes/router'
import { useAuthStore } from '../stores/authStore'

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

axios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status) {
            let authStore = useAuthStore()

            authStore.$reset()

            router.push({ name: 'Login' })

            return error.response
        }
    },
)

export default axios
