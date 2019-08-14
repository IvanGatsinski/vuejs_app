<template>
       <v-container grid-list-xl>
        <v-layout row justify-space-around align-center class="mt-5">
          <v-flex xs12 sm4 md4 lg4 xl4>
    <v-form
    v-model="valid"
    ref="productForm"
  >
    <v-text-field
      v-model="productName"
      :counter="15"
      :rules="productNameRules"
      label="Name"
      required
      validate-on-blur=""
      clearable
      prepend-inner-icon="mdi-account"
    ></v-text-field>

    <v-text-field
      v-model="productPrice"
      :rules="productPriceRules"
      label="Price"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-lock"
      
    ></v-text-field>

    <v-textarea
      v-model="productDescription"
      :rules="productDescriptionRules"
      :counter="250"
      label="Description"
      no-resize
      rows="5"
      required
      validate-on-blur
      clearable
      :placeholder="'Your product description'"
      prepend-inner-icon="mdi-text"
    ></v-textarea>

    <v-radio-group
      label="condition"
      v-model="productCondition" 
      :rules="productConditionRules"
      required row>
      <v-radio label="New" color="secondary" value="New"></v-radio>
      <v-radio label="Old" color="secondary" value="Old"></v-radio>
    </v-radio-group>

    <v-btn
      class="mr-4"
      @click="submitEdit">
      Save
    </v-btn>
    
    <v-btn 
      @click="$router.back(-1)"
      class="mr-4">
      Cancel
    </v-btn>
  </v-form>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapMutations } from 'vuex'
import store from '../../store/index'

export default {
    name: 'EditProduct',
    data() {
      return {
        productId: this.$router.history.current.params.id,
        valid: true,
        productNameRules: [
          v => !!v || 'Product must have a name',
          v => v && v.length >= 3 && v.length <= 15 || 'Product name must be between 3 and 15 characters long',
          v => v && /^(([a-zA-Z]{3,})(\s?))+[^\s]$/.test(v) || 'Product name must contain latin letters only separated by a single space.',
          
        ],
        productPriceRules: [
          v => !!v || 'Product must have price.',
          v => /^([0-9]{1,5}[.])?[0-9]{1,5}$/.test(v) || 'Price must be a valid number between 1 and 99999'
        ],
        productDescriptionRules: [
          v => !!v || 'Product must have description.',
          v => v && v.length >= 10 && v.length <= 250 || 'Product description must be between 10 and 250 characters long',
          v => /^(([a-zA-Z0-9]+)(\s?))+[^\s]$/.test(v) || 'Product description must start and finish without space,also must contain latin letters and digits separated by a single space',
        ],
        productConditionRules: [
          v => !!v || 'Product must have condition.'
        ]
      }
    },
    computed: {
        ...mapFields('products', [
            'editProduct.valid',
            'editProduct.productName', 
            'editProduct.productPrice', 
            'editProduct.productDescription', 
            'editProduct.productCondition'
        ]),
        // formIsValid() {
        //   return this.productName && 
        //          this.productPrice && 
        //          this.productDescription &&
        //          this.productCondition &&
        //          this.$refs.productForm.validate() ? 
        //          true : false
        // }
    },
    methods: {
        ...mapActions('products', [
             'editProduct',
             'clearEditProductFields'
        ]),
        submitEdit() {
          if (this.$refs.editProduct.validate()) {
              this.editProduct(this.productId)
          }
           //this.formIsValid ?  : false
        }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('products/setProductForEdit', to.params.id)
        next()
    },
    beforeDestroy() {
        this.$refs.editProduct.reset()
    }
}
</script>

<style>

</style>
