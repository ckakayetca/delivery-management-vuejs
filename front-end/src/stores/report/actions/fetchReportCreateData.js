import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'
import { useToast } from 'vue-toastification'

/**
 * Fetch Reports create
 * Action to fetch the reports create
 * @returns {Object} - The response
 */
export default async function fetchReportCreateData() {
    const store = useReportStore()
    const toast = useToast()

    store.create.state = 'loading'

    try {
        const response = await ReportService.fetchReportCreateData()

        if (response.status === 200) {
            console.log('Fetched reports create data: ', response.data)
            store.create.data = response.data
            store.create.state = 'loaded'

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            store.create.state = 'error'
            toast.error(response.message)

            return {
                status: response.status,
                data: response.data,
            }
        }
    } catch (error) {
        store.create.state = 'error'

        toast.error(error.message)

        return {
            status: error.status,
            data: error.data,
        }
    }
}
