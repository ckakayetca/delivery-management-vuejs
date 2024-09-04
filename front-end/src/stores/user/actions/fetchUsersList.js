import UserService from '@/services/UserService'

import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

/**
 * Fetch Users list
 * Action to fetch the users list
 * @returns {Object} - The response
 */
export default async function fetchUsersList() {
    const store = useUserStore()
    const toast = useToast()

    store.list.state = 'loading'

    try {
        const response = await UserService.fetchUsersList()

        if (response.status === 200) {
            console.log('Fetched users list: ', response.data)
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
