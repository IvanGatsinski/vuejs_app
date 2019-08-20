import { getField } from 'vuex-map-fields'

const isAuthor = (state) => (authorId) => {
    return state.userProfile._id === authorId
}
const isItemInCart = (state) => (itemId) => {
    return state.userProfile.cart.find(item => item === itemId)
}
const cartTotalPrice = (state) => {
    return state.cartProducts
           .map(product => Number(product.price))
           .reduce((numX, numY) => numX + numY, 0)
           .toString() + ' $'
}
const getAge = state => birthDate => {

    let todayDate = new Date().toISOString().substr(0, 10);
    let splitTodayDate = todayDate.split('-')
    console.log(birthDate)
    let splitBirthDate = birthDate.split('-')

    let todayYear = splitTodayDate[0]
    let todayMonth = splitTodayDate[1]
    let birthDateYear = splitBirthDate[0]
    let birthDateMonth = splitBirthDate[1]

    let age = todayYear - birthDateYear;
    let month = todayMonth - birthDateMonth;
    if (month < 0 || (month === 0 && todayDate < birthDate)) {
        age--;
    }
    return age;
}

export default {
    getField,
    isAuthor,
    isItemInCart,
    cartTotalPrice,
    getAge
}