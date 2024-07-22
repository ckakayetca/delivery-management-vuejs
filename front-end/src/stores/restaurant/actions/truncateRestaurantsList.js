import { useRestaurantStore } from '@/stores/restaurant'

/**
 * Action to truncate the restaurants list
 */
export default async function truncateRestaurantsList() {
    const store = useRestaurantStore()

    store.list.data = []
    store.list.state = 'loading'
}
