<template>
    <div>
       <div class="section__heading">Edit product</div>
       <v-container grid-list-xl>
        <v-layout row justify-space-around align-center class="mt-5">
          <v-flex xs12 sm4 md4 lg4 xl4>
    <v-form
    v-model="valid"
    ref="editProductForm"
  >
      <v-text-field
      v-model="imageUrl"
      :rules="imageUrlRules"
      label="Image URL"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-image"
    ></v-text-field>

    <v-text-field
      v-model="productName"
      :counter="20"
      :rules="productNameRules"
      label="Product name"
      required
      validate-on-blur=""
      clearable
      prepend-inner-icon="mdi-shopify"
    ></v-text-field>

    <v-text-field
      v-model="productPrice"
      :rules="productPriceRules"
      label="Price"
      required
      validate-on-blur
      clearable
      prepend-inner-icon="mdi-currency-eur"
      
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

    <v-wait for="edit product loading btn">
      <template slot="waiting">
        <v-btn
          loading
          disabled
          class="mr-4">
          Edit
        </v-btn>
        <v-btn 
          disabled
          class="mr-4">
          Cancel
        </v-btn>
      </template>
        <v-btn
          color="success"
          class="mr-4"
          @click="submitEdit()">
          Edit
        </v-btn>
        <v-btn 
          color="warning"
          @click="$router.back(-1)"
          class="mr-4">
          Cancel
        </v-btn>
    </v-wait>
  </v-form>
          </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
import { product_validation_mixin } from '../../mixins/validation_mixins'
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapState } from 'vuex'
import { fetchProduct } from '@/api_calls/products'
import store from '../../store/index'

export default {
    name: 'EditProduct',
    mixins: [ product_validation_mixin ],
    data() {
      return {
        productId: this.$router.history.current.params.id,
      }
    },
    computed: {
        ...mapFields('products', [
            'editProduct.valid',
            'editProduct.imageUrl',
            'editProduct.productName', 
            'editProduct.productPrice', 
            'editProduct.productDescription', 
            'editProduct.productCondition'
        ]),
    },
    methods: {
        ...mapActions('products', [
             'editProduct',
        ]),
        submitEdit() {
          if (this.$refs.editProductForm.validate() && this.productName.length <= 20) {
              this.editProduct(this.productId)
          }
        }
    },
    async beforeRouteEnter(to, from, next) {
      let product = await fetchProduct(to.params.id)
      store.commit('products/SET_EDIT_PRODUCT_FORM_FIELDS', product.data)
      next()
    },
}
</script>

<style>

</style>
