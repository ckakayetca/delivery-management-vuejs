import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useReportStore = defineStore('reportStore', {
    state: () => ({
        list: {
            state: 'loading',
            data: [],
        },
        create: {
            state: 'loading',
            data: null,
        },
    }),
    actions,
    getters,
})
