import ReportService from '@/services/ReportService'

import { useReportStore } from '@/stores/report'
import { useToast } from 'vue-toastification'

/**
 * Generate Reports spreadsheet
 * Action to generate the reports spreadsheet
 * @param {Boolean} self - If the reports are the user's own reports
 * @param {Object} query - The query to filter the reports
 * @returns {Object} - The response
 */
export default async function generateSpreadsheet(query) {
    const store = useReportStore()
    const toast = useToast()

    try {
        const response = await ReportService.generateSpreadsheet(query)

        if (response.status === 201) {
            toast.success('Успешно генериране на доклад.')

            return {
                status: response.status,
                data: response.data,
            }
        } else {
            toast.error('Failed to generate sheet!')

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
