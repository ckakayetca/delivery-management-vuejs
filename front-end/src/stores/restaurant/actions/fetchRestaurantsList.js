import RestaurantService from '@/services/RestaurantService'

import { useRestaurantStore } from '@/stores/restaurant'
import { useToast } from 'vue-toastification'

/**
 * Fetch Restaurants list
 * Action to fetch the restaurants list
 * @returns {Object} - The response
 */
export default async function fetchRestaurantsList() {
    const store = useRestaurantStore()
    const toast = useToast()

    store.list.state = 'loading'

    try {
        const response = await RestaurantService.fetchRestaurantsList()

        if (response.status === 200) {
            console.log('Fetched restaurants list: ', response.data)
            store.list.data = response.data
            store.list.state = 'loaded'

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            store.list.state = 'error'
            toast.error(response.message)

            return {
                status: response.status,
                data: response.data,
            }
        }
    } catch (error) {
        store.list.state = 'error'

        toast.error(error.message)

        return {
            status: error.status,
            data: error.data,
        }
    }
}
