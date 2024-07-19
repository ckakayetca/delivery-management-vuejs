import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useRestaurantStore = defineStore('restaurantStore', {
    state: () => ({
        list: {
            state: 'loading',
            data: [],
        },
    }),
    actions,
    getters,
})
