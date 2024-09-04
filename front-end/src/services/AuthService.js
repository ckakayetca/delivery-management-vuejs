import axios from '@/config/axios'

/**
 * Auth Service
 * Class to handle the API calls related to authentication
 * @class
 */
class AuthService {
    /**
     * Login
     * @param {Object} data - The login data
     * @returns {Promise} - The promise object of the API call
     */
    login(data) {
        return axios.post('users/login', data)
    }

    /**
     * Register
     * @param {Object} data - The registration data
     * @returns {Promise} - The promise object of the API call
     */
    register(data) {
        return axios.post('users/register', data)
    }

    /**
     * Logout
     * @returns {Promise} - The promise object of the API call
     */
    logout() {
        return axios.get('users/logout')
    }

    /**
     * Get Profile
     * @returns {Promise} - The promise object of the API call
     */
    getProfile() {
        return axios.get('users/profile')
    }

    /**
     * Verify Token
     * @returns {Promise} - The promise object of the API call
     */
    verifyToken() {
        return axios.get('users')
    }
}

export default new AuthService()
