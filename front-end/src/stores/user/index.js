import { defineStore } from 'pinia'

import actions from './actions'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        list: {
            state: 'loading',
            data: [],
        },
    }),
    actions,
    getters: {
        getUsersList() {
            return this.list.data
        },
        getUsersListState() {
            return this.list.state
        },
    },
})
