import { defineStore } from 'pinia'
import { emptyUser } from '../utils/utils'
import { useToast } from 'vue-toastification'

import AuthService from '@/services/AuthService'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: emptyUser,
        isLoggedIn: false,
        isAdmin: false,
    }),
    actions: {
        async init() {
            const response = await AuthService.getProfile()

            if (response.status === 200) {
                this.setUser(response.data)
            }
        },
        setUser(data) {
            this.user = data

            if (this.user) {
                this.isLoggedIn = true

                this.isAdmin = this.user.role === 'admin' ? true : false
            } else {
                this.isLoggedIn = false
            }
        },
        async logout() {
            try {
                let response = await AuthService.logout()

                if (response.status === 200) {
                    this.setUser(emptyUser)
                    this.isLoggedIn = false
                    this.isAdmin = false
                }
            } catch (error) {
                console.log(error)

                // TODO: implement proper error handling
            }
        },
        async login(formData) {
            try {
                const response = await AuthService.login(formData)

                if (response.status == 200) {
                    const user = response.data
                    this.setUser(user)
                    localStorage.setItem('delivery-management', true)

                    return response.status
                }

                toast.error('Грешно потребителско име или парола!')

                return response.status
            } catch (error) {
                toast.error('Грешно потребителско име или парола!')

                return error.response.status
            }
        },
        async register(formData) {
            try {
                const response = await AuthService.register(formData)

                return response.status
            } catch (error) {
                return error.response.status
                // TODO: implement proper error handling
            }
        },
    },
    getters: {
        getUser() {
            return this.user
        },
    },
})
