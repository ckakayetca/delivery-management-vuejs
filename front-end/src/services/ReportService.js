import axios from '@/config/axios'

/**
 * Report Service
 * Class to handle the API calls related to reports
 * @class
 */
class ReportService {
    /**
     * Fetch Reports
     * @param {Boolean} self - If the reports are the user's own reports
     * @param {Object} params - The query to filter the reports
     * @returns {Promise} - The promise object of the API call
     */
    fetchReportsList(self, params) {
        return axios.get(`reports/${self ? 'my' : ''}`, { params })
    }

    /**
     * Fetch Report
     * @param {Number} id - The report id
     * @returns {Promise} - The promise object of the API call
     */
    fetchReport(id) {
        return axios.get(`reports/${id}`)
    }

    /**
     * Fetch Report Create Data
     * @returns {Promise} - The promise object of the API call
     */
    fetchReportCreateData() {
        return axios.get('reports/create')
    }

    /**
     * Create Report
     * @param {Object} data - The report data
     * @returns {Promise} - The promise object of the API call
     */
    createReport(data) {
        return axios.post('reports', data)
    }

    /**
     * Edit Report
     * @param {Number} id - The report id
     * @param {Object} data - The report data
     * @returns {Promise} - The promise object of the API call
     */
    editReport(id, data) {
        return axios.put(`reports/${id}`, data)
    }

    /**
     * Delete Report
     * @param {Number} id - The report id
     * @returns {Promise} - The promise object of the API call
     */
    deleteReport(id) {
        return axios.delete(`reports/${id}`)
    }
}

export default new ReportService()
