import { useToast } from 'vue-toastification'
import RestaurantService from '@/services/RestaurantService'

import { useRestaurantStore } from '@/stores/restaurant'

/**
 * Create Restaurant
 * Action to create a restaurant
 * @param {Object} data - The restaurant data
 * @returns {Object} - The data of the created restaurant
 */
export default async function createRestaurant(data) {
    const toast = useToast()
    const store = useRestaurantStore()

    try {
        const response = await RestaurantService.createRestaurant(data)

        if (response.status === 201) {
            toast.success('Успешно създаване на ресторант!')

            store.list.data.unshift(response.data.data)

            return {
                status: response.status,
                data: response.data.data,
            }
        } else {
            console.toast.error('Неуспешно създаване на ресторант!')

            return {
                status: response.status,
                data: response.data.data,
            }
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)

        return {
            status: error.status,
            data: error.data.data,
        }
    }
}
