import axios from '@/config/axios'

/**
 * Restaurant Service
 * Class to handle the API calls related to restaurants
 * @class
 */
class RestaurantService {
    /**
     * Fetch Restaurants
     * @returns {Promise} - The promise object of the API call
     */
    fetchRestaurantsList() {
        return axios.get('restaurants')
    }

    /**
     * Create Restaurant
     * @param {Object} data - The restaurant data
     * @returns {Promise} - The promise object of the API call
     */
    createRestaurant(data) {
        return axios.post('restaurants', data)
    }

    /**
     * Update Restaurant
     * @param {Number} id - The restaurant id
     * @param {Object} data - The restaurant data
     * @returns {Promise} - The promise object of the API call
     */
    updateRestaurant(id, data) {
        return axios.put(`restaurants/${id}`, data)
    }

    /**
     * Delete Restaurant
     * @param {Number} id - The restaurant id
     * @returns {Promise} - The promise object of the API call
     */
    deleteRestaurant(id) {
        return axios.delete(`restaurants/${id}`)
    }
}

export default new RestaurantService()
