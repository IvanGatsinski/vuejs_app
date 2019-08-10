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
      :counter="10"
      :rules="productNameRules"
      label="Name"
      required
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
      :value="'Your product description'"
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
        <v-btn @click="cancelEdit()"
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
          v => !!v || 'Product must have name',
        ],
        productPriceRules: [
          v => !!v || 'Product must have price.',
        ],
        productDescriptionRules: [
          v => !!v || 'Product must have description.',
        ],
        productConditionRules: [
          v => !!v || 'Product must have condition.'
        ]
      }
    },
    computed: {
        ...mapFields('products', [
            'editProduct.productName', 
            'editProduct.productPrice', 
            'editProduct.productDescription', 
            'editProduct.productCondition'
        ]),
        isFormValid() {
          console.log(this.$refs)
          return this.productName && 
                 this.productPrice && 
                 this.productDescription &&
                 this.productCondition &&
                 this.$refs.productForm.validate() ? 
                 'success' : 'warning'
        }
    },
    methods: {
        ...mapActions('products', [
             'editProduct',
             'clearEditProductFields'
        ]),
        cancelEdit() {
            this.$router.back(-1)
        },
        submitEdit() {
            this.editProduct(this.productId)
        }
    },
    beforeRouteEnter(to, from, next) {
        store.dispatch('products/setProductForEdit', to.params.id)
        next()
    },
    beforeDestroy() {
        this.clearEditProductFields()
    }
}
</script>

<style>

</style>
