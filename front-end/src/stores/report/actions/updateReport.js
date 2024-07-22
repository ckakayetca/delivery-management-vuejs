import { useToast } from 'vue-toastification'
import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'

/**
 * Update Report
 * Action to update a report
 * @param {Object} id - The report's id
 * @param {Object} data - The report data
 * @returns {Object} - The data of the updated report
 */
export default async function updateReport(id, data) {
    const toast = useToast()
    const store = useReportStore()

    try {
        const response = await ReportService.updateReport(id, data)

        if (response.status === 201) {
            const reportIndex = store.list.data.findIndex((report) => report.id === id)

            if (reportIndex) {
                store.list.data[reportIndex] = response.data
            }

            toast.success('Успешно редактиране на ресторант!')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Неуспешно редактиране на ресторант!')

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
