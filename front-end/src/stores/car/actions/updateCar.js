import { useToast } from 'vue-toastification'
import CarService from '@/services/CarService'

/**
 * Update Car
 * Action to update a car
 * @param {Object} id - The car's id
 * @param {Object} data - The car data
 * @returns {Object} - The data of the updated car
 */
export default async function updateCar(id, data) {
    const toast = useToast()

    try {
        const response = await CarService.updateCar(id, data)

        if (response.status === 200) {
            const carIndex = this.list.data.findIndex((car) => car._id === id)

            if (carIndex) {
                console.log(carIndex)
                this.list.data[carIndex] = response.data
            }

            toast.success('Успешно редактиране на автомобил!')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно редактиране на автомобил!')

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
