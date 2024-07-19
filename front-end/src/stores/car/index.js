import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useCarStore = defineStore('carStore', {
    state: () => ({
        list: {
            state: 'loading',
            data: [],
        },
    }),
    actions,
    getters,
})
