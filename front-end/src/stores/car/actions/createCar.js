import { useToast } from 'vue-toastification'
import CarService from '@/services/CarService'

import { useCarStore } from '@/stores/car'

/**
 * Create Car
 * Action to create a car
 * @param {Object} data - The car data
 * @returns {Object} - The data of the created car
 */
export default async function createCar(data) {
    const toast = useToast()
    const store = useCarStore()

    try {
        const response = await CarService.createCar(data)

        if (response.status === 201) {
            toast.success('Успешно създаване на автомобил!')

            store.list.data.push(response.data.data)

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно създаване на автомобил!')

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
