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
    async login(data) {
        return await axios.post('users/login', data)
    }

    /**
     * Register
     * @param {Object} data - The registration data
     * @returns {Promise} - The promise object of the API call
     */
    async register(data) {
        return await axios.post('users/register', data)
    }

    /**
     * Logout
     * @returns {Promise} - The promise object of the API call
     */
    async logout() {
        return await axios.get('users/logout')
    }

    /**
     * Get Profile
     * @returns {Promise} - The promise object of the API call
     */
    async getProfile() {
        return await axios.get('users/profile')
    }

    /**
     * Edit Profile
     * @returns {Promise} - The promise object of the API call
     */
    async editProfile() {
        return await axios.put('users/profile', data)
    }

    /**
     * Verify Token
     * @returns {Promise} - The promise object of the API call
     */
    async verifyToken() {
        return await axios.get('users')
    }
}

export default new AuthService()
