import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'
import { useToast } from 'vue-toastification'

/**
 * Fetch Reports list
 * Action to fetch the reports list
 * @param {Boolean} self - If the reports are the user's own reports
 * @param {Object} query - The query to filter the reports
 * @returns {Object} - The response
 */
export default async function fetchReportsList(self = false, query) {
    const store = useReportStore()
    const toast = useToast()

    store.list.state = 'loading'

    try {
        const response = await ReportService.fetchReportsList(self, query)

        if (response.status === 200) {
            console.log('Fetched reports list: ', response.data.reports)
            store.list.data = response.data.reports
            store.list.totals = response.data.totals
            store.list.state = 'loaded'

            return {
                status: response.status,
                data: response.data.reports,
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
