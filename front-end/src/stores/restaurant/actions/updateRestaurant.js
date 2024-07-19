import { useToast } from 'vue-toastification'
import RestaurantService from '@/services/RestaurantService'

/**
 * Update Restaurant
 * Action to update a restaurant
 * @param {Object} id - The restaurant's id
 * @param {Object} data - The restaurant data
 * @returns {Object} - The data of the updated restaurant
 */
export default async function updateRestaurant(id, data) {
    const toast = useToast()

    try {
        const response = await RestaurantService.updateRestaurant(id, data)

        if (response.status === 201) {
            const restaurantIndex = this.list.data.findIndex((restaurant) => restaurant.id === id)

            if (restaurantIndex) {
                this.list.data[restaurantIndex] = response.data
            }

            toast.success('Успешно редактиране на ресторант!')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно редактиране на ресторант!')

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
