import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'
import { useToast } from 'vue-toastification'

/**
 * Fetch Reports list
 * Action to fetch the reports list
 * @returns {Object} - The response
 */
export default async function fetchReportsList() {
    const store = useReportStore()
    const toast = useToast()

    store.list.state = 'loading'

    try {
        const response = await ReportService.fetchReportsList()

        if (response.status === 200) {
            console.log('Fetched reports list: ', response.data)
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
