import { defineStore } from 'pinia'

import actions from './actions'
import getters from './getters'

export const useReportStore = defineStore('reportStore', {
    state: () => ({
        list: {
            state: 'loading',
            data: [],
            totals: {
                totalAmountR: 0,
                totalAmountTG: 0,
                totalDeliveries: 0,
            },
        },
        create: {
            state: 'loading',
            data: null,
        },
    }),
    actions,
    getters,
})
