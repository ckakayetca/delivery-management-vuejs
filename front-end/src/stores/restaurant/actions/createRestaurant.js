import { useToast } from 'vue-toastification'
import RestaurantService from '@/services/RestaurantService'

/**
 * Create Restaurant
 * Action to create a restaurant
 * @param {Object} data - The restaurant data
 * @returns {Object} - The data of the created restaurant
 */
export default async function createRestaurant(data) {
    const toast = useToast()

    try {
        const response = await RestaurantService.createRestaurant(data)

        if (response.status === 201) {
            toast.success('Успешно създаване на ресторант!')

            this.list.data.push(response.data)

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно създаване на ресторант!')

            return {
                status: response.status,
                data: response.data,
            }
        }
    } catch (error) {
        toast.error(error.message)

        return {
            status: error.status,
            data: error.data,
        }
    }
}
