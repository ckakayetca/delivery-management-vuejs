import { defineStore } from 'pinia';
import { emptyUser } from '../utils/utils';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: emptyUser,
        isLoggedIn: false,
        isAdmin: false,
    }),
    actions: {
        setUser(data) {
            this.user = data;

            if(this.user) {
                this.isLoggedIn = true;

                this.isAdmin = this.user.role === 'admin' ? true : false;
            } else {
                this.isLoggedIn = false;
            }
        }
    }
})