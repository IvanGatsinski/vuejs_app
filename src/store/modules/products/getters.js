import { getField } from 'vuex-map-fields'

const productDate = state  => (date_kmd, operation) => {
    let publishedOrModified;

    operation === 'published' ? 
    publishedOrModified = 'Published on' :
    publishedOrModified = 'Last modified on'

    let date = new Date(date_kmd),
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

    return `${publishedOrModified} ${day}-${month}-${year} at ${hours}:${minutes}:${seconds} ${dayOrNight}.`
}
const formatPrice = state => price => {
    return `${Number(price).toFixed(2)} &euro;`
}

export default {
    getField,
    productDate,
    formatPrice,
}