import { useToast } from 'vue-toastification'
import UserService from '@/services/UserService'

import { useUserStore } from '@/stores/user'

/**
 * Delete User
 * Action to delete a user
 * @param {Object} id - The user id
 * @returns {Object} - The response
 */
export default async function deleteUser(id) {
    const toast = useToast()
    const store = useUserStore()

    try {
        const response = await UserService.deleteUser(id)

        if (response.status === 200) {
            toast.success('Успешно изтриване на потребител!')

            // remove the deleted user from the list
            store.list.data = store.list.data.filter((user) => user._id !== id)

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно изтриване на потребител!')

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
