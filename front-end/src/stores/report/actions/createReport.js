import { useToast } from 'vue-toastification'
import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'

/**
 * Create Report
 * Action to create a report
 * @param {Object} data - The report data
 * @returns {Object} - The data of the created report
 */
export default async function createReport(data) {
    const toast = useToast()
    const store = useReportStore()

    try {
        const response = await ReportService.createReport(data)

        if (response.status === 201) {
            toast.success('Успешно създаване на отчет!')

            store.list.data.unshift(response.data.data)

            return {
                status: response.status,
                data: response.data.data,
            }
        } else {
            console.toast.error('Неуспешно създаване на отчет!')

            return {
                status: response.status,
                data: response.data.data,
            }
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)

        return {
            status: error.status,
            data: error.data.data,
        }
    }
}
