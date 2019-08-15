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

export {
    product_validation_mixin,
}