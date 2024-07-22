import { useToast } from 'vue-toastification'
import CarService from '@/services/CarService'

import { useCarStore } from '@/stores/car'

/**
 * Delete Car
 * Action to delete a car
 * @param {Object} id - The car id
 * @returns {Object} - The response
 */
export default async function deleteCar(id) {
    const toast = useToast()
    const store = useCarStore()

    try {
        const response = await CarService.deleteCar(id)

        if (response.status === 200) {
            toast.success('Успешно изтриване на автомобил!')

            // remove the deleted car from the list
            store.list.data = store.list.data.filter((car) => car._id !== id)

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно изтриване на автомобил!')

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
