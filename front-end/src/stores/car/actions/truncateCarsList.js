/**
 * Action to truncate the cars list
 */
export default async function truncateCarsList() {
    this.list.data = []
    this.list.state = 'loading'
}
