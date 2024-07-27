import moment from 'moment/moment'
import 'moment/locale/bg'

// util to transform dates from backend into readable dates
// i will use momentjs
// https://momentjs.com/

moment.locale('bg')

/**
 * Day in milliseconds
 * @type {number}
 * @constant
 */
export const day = 24 * 60 * 60 * 1000

/**
 * Get the distance from now to the given date in string format
 * @param {Date} date - The date to compare to
 * @returns {string} - The distance from now to the given date
 */
export function dateFromNow(date) {
    return moment(date).fromNow()
}

/**
 * Format the date to a readable format
 * @param {Date} date - The date to format
 * @returns {string} - The formatted date
 */
export function readableDate(date) {
    return moment(date).format('YYYY-MM-DD')
}

/**
 * Get the full date
 * @param {Date} date - The date to format
 * @returns {string} - The full date
 */
export function fullDate(date) {
    return moment(date).locale('bg-BG').format('DD/MM/YYYY')
}

/**
 * Get last week's Monday and Sunday dates
 * @returns {Object} - The last week's Monday and Sunday dates
 * @property {string} start_date - The last week's Monday date
 * @property {string} end_date - The last week's Sunday date
 */
export function lastWeek() {
    const today = new Date()
    const lastMonday = new Date(today - today.getDay() * day - 6 * day)
    const lastSunday = new Date(today - today.getDay() * day)

    return {
        start_date: readableDate(lastMonday),
        end_date: readableDate(lastSunday),
    }
}

/**
 * Get this week's Monday and Sunday dates
 * @returns {Object} - This week's Monday and Sunday dates
 * @property {string} start_date - This week's Monday date
 * @property {string} end_date - This week's Sunday date
 */
export function thisWeek() {
    const today = new Date()
    const thisMonday = new Date(today - today.getDay() * day + day)

    return {
        start_date: readableDate(thisMonday),
        end_date: readableDate(today),
    }
}
