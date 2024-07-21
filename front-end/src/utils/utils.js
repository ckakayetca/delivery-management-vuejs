import moment from 'moment/moment'
import 'moment/locale/bg'

// util to transform dates from backend into readable dates
// i will use momentjs
// https://momentjs.com/

moment.locale('bg')

export const day = 24 * 60 * 60 * 1000

export function dateFromNow(date) {
    return moment(date).fromNow()
}

export function readableDate(date) {
    return moment(date).format('YYYY-DD-MM')
}

export function fullDate(date) {
    return moment(date).locale('bg-BG').format('DD/MM/YYYY')
}

// empty user object

export let emptyUser = {
    username: '',
    name: '',
    tel: '',
    reports: [],
    role: '',
    _id: '',
}
