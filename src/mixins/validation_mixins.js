const product_validation_mixin = {
    data() {
        return {
            productNameRules: [
                v => !!v || 'Product must have a name',
                v => /^.{3,15}$/.test(v) || 'Product name must be between 3 and 15 characters long',
                v => v && /^(([a-zA-Z]{3,})(\s?))+[^\s]$/.test(v) || 'Product name must contain latin letters only separated by a single space.',
              ],
              productPriceRules: [
                v => !!v || 'Product must have price.',
                v => /^[^0].+$/.test(v) || 'Product price cannot start with 0',
                v => /^([0-9]{1,5}[.])?[0-9]{1,5}$/.test(v) || 'Price must be a valid number between 1 and 99999'
              ],
              productDescriptionRules: [
                v => !!v || 'Product must have description.',
                v => /^.{7,250}$/.test(v) || 'Product description must be between 7 and 250 characters long',
                v => /^(([a-zA-Z0-9]+)(\s?))+[^\s]$/.test(v) || 'Product description must start and finish without space,also must contain latin letters and digits separated by a single space',
              ],
              productConditionRules: [
                v => !!v || 'Product must have condition.'
              ]
        }
    }
}

const user_register_validation_mixin = {
  data() {
    return {
      nameRules: [
        v => !!v || 'Name is required',
        v => /^[a-zA-Z]{3,12}$/.test(v) || 'Username must contain letters only and be between 3 and 12 characters long'
        ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^\w{5,12}$/.test(v) || 'Password must be between 5 and 12, contain letters, numbers or underscores',
        ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => (this.confirmPassword === this.password) || 'Passwords must match'
        ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) 
        || 'Must be a valid E-mail'
        ],
      cityRules: [v => !!v || 'City is required!'],
      genderRules: [v => !!v || 'Gender is required!'],
      birthdayRules: [v => !!v || 'Date of birth is required!'],
      phoneRules: [
        v => !!v || 'Phone is required',
        v => /^(0988|0888|0878)[1-9]{6}$/.test(v) || 'Must be a valid phone number'
        ],
      cities: ['Pleven', 'Plovdiv', 'Sofia', 'Varna', 'Bourgas', 'Ruse', 'Sliven', 'Stara Zagora', 'Qmbol', 'Vidin'],
    }
  },
}
export {
    product_validation_mixin,
    user_register_validation_mixin,
}