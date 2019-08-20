import { getField } from 'vuex-map-fields'

const productPublishedDate = state  => published => {
    let date = new Date(published),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    dayOrNight = hours >= 0 && hours <= 12 ? 'AM' : 'PM'

    month < 10 ? month = `0${month}` : false
    day < 10 ? day = `0${day}` : false
    hours < 10 ? hours = `0${hours}` : false
    minutes < 10 ? minutes = `0${minutes}` : false
    seconds < 10 ? seconds = `0${seconds}` : false

    return `Published on ${day}-${month}-${year} at ${hours}:${minutes}:${seconds} ${dayOrNight}.`
}
const productLastEdittedDate = state => lastEdit => {
    let date = new Date(lastEdit),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    dayOrNight = hours >= 0 && hours <= 12 ? 'AM' : 'PM'

    month < 10 ? month = `0${month}` : false
    day < 10 ? day = `0${day}` : false
    hours < 10 ? hours = `0${hours}` : false
    minutes < 10 ? minutes = `0${minutes}` : false
    seconds < 10 ? seconds = `0${seconds}` : false

    return `Last modified on ${day}-${month}-${year} at ${hours}:${minutes}:${seconds} ${dayOrNight}.`
}

export default {
    getField,
    productPublishedDate,
    productLastEdittedDate,
}