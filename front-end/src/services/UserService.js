import axios from '@/config/axios'

class UserService {
    fetchUsersList() {
        return axios.get('users/all')
    }

    updateUser(id) {
        return axios.patch(`users/${id}`)
    }

    deleteUser(id) {
        return axios.delete(`users/${id}`)
    }
}

export default new UserService()
