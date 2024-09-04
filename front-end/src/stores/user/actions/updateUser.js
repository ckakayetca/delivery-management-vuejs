import { useToast } from 'vue-toastification'
import UserService from '@/services/UserService'

import { useUserStore } from '@/stores/user'

/**
 * Update User
 * Action to update a user
 * @param {Object} id - The user's id
 * @param {Object} data - The user data
 * @returns {Object} - The data of the updated user
 */
export default async function updateUser(id, data) {
    const toast = useToast()
    const store = useUserStore()

    try {
        const response = await UserService.updateUser(id, data)

        if (response.status === 200) {
            const userIndex = store.list.data.findIndex((user) => user.id === id)

            if (userIndex) {
                store.list.data[userIndex] = response.data
            }

            toast.success('Успешно редактиране на потребител!')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно редактиране на потребител!')

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
