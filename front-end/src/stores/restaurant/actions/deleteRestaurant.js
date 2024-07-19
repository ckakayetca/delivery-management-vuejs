import { useToast } from 'vue-toastification'
import RestaurantService from '@/services/RestaurantService'

/**
 * Delete Restaurant
 * Action to delete a restaurant
 * @param {Object} id - The restaurant id
 * @returns {Object} - The response
 */
export default async function deleteRestaurant(id) {
    const toast = useToast()

    try {
        const response = await RestaurantService.deleteRestaurant(id)

        if (response.status === 200) {
            toast.success('Успешно изтриване на ресторант!')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно изтриване на ресторант!')

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
