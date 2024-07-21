import axios from '@/config/axios'

/**
 * Car Service
 * Class to handle the API calls related to cars
 * @class
 */
class CarService {
    /**
     * Fetch Cars
     * @returns {Promise} - The promise object of the API call
     */
    fetchCarsList() {
        return axios.get('cars')
    }

    /**
     * Create Car
     * @param {Object} data - The car data
     * @returns {Promise} - The promise object of the API call
     */
    createCar(data) {
        return axios.post('cars', data)
    }

    /**
     * Edit Car
     * @param {Number} id - The car id
     * @param {Object} data - The car data
     * @returns {Promise} - The promise object of the API call
     */
    updateCar(id, data) {
        return axios.patch(`cars/${id}`, data)
    }

    /**
     * Delete Car
     * @param {Number} id - The car id
     * @returns {Promise} - The promise object of the API call
     */
    deleteCar(id) {
        return axios.delete(`cars/${id}`)
    }
}

export default new CarService()
