import { useReportStore } from '@/stores/report'

/**
 * Action to truncate the reports list
 */
export default async function truncateReportsList() {
    const store = useReportStore()

    store.list.data = []
    store.list.state = 'loading'
}
