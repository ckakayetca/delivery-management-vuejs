import CarService from '@/services/CarService'

/**
 * Fetch Cars list
 * Action to fetch the cars list
 * @returns {Object} - The response
 */
export default async function fetchCarsList() {
    this.list.state = 'loading'

    try {
        const response = await CarService.fetchCarsList()

        if (response.status === 200) {
            console.log('Fetched cars list:', response.data)

            this.list.data = response.data
            this.list.state = 'loaded'

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            this.list.state = 'error'

            return {
                status: response.status,
                data: response.data,
            }
        }
    } catch (error) {
        this.list.state = 'error'

        return {
            status: error.status,
            data: error.data,
        }
    }
}
