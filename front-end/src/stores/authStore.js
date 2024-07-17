import { defineStore } from 'pinia'
import { emptyUser } from '../utils/utils'

import AuthService from '@/services/AuthService'

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
                } else {
                    console.log('Expected status 200, got ' + response.status)
                    console.log('Response data: ', response.data)
                }

                return response.status
            } catch (error) {
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
