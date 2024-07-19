/**
 * Action to truncate the restaurants list
 */
export default async function truncateRestaurantsList() {
    this.list.data = []
    this.list.state = 'loading'
}
