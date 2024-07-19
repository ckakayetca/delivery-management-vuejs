import CarService from '@/services/CarService'

/**
 * Fetch Cars list
 * Action to fetch the cars list
 * @returns {Object} - The response
 */
export default async function fetchCarsList(data) {
    this.list.state = 'loading'

    try {
        const response = await CarService.createCar(data)

        if (response.status === 200) {
            this.list.data = response.data
            this.list.state = 'loaded'

            toast.success('Успешно създаване на автомобил!')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            this.list.state = 'error'

            toast.error('Неуспешно създаване на автомобил!')

            return {
                status: response.status,
                data: response.data,
            }
        }
    } catch (error) {
        this.list.state = 'error'

        toast.error(error.message)

        return {
            status: error.status,
            data: error.data,
        }
    }
}
