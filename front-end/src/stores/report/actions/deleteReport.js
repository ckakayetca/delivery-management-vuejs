import { useToast } from 'vue-toastification'
import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'

/**
 * Delete Report
 * Action to delete a report
 * @param {Object} id - The report id
 * @returns {Object} - The response
 */
export default async function deleteReport(id) {
    const toast = useToast()
    const store = useReportStore()

    try {
        const response = await ReportService.deleteReport(id)

        if (response.status === 200) {
            toast.success('Успешно изтриване на отчет!')

            // remove the deleted report from the list
            store.list.data = store.list.data.filter((report) => report._id !== id)

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно изтриване на отчет!')

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
