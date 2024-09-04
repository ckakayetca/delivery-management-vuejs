import { useUserStore } from '@/stores/user'

/**
 * Action to truncate the users list
 */
export default async function truncateUsersList() {
    const store = useUserStore()

    store.list.data = []
    store.list.state = 'loading'
}
