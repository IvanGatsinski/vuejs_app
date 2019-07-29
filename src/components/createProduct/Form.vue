<template>
    <div>
    <h3>Create your product!</h3>
    <form @submit.prevent="submitProduct">
      <label for="name">
        Name
        <input id="name" type="text" v-model="name" placeholder="product name" />
      </label>

      <label for="price">
        Price
        <input
          id="price"
          type="price"
          v-model="price"
          placeholder="product price"
        />
      </label>

          <label for="description">
        Description
        <input
          id="description"
          type="description"
          v-model="description"
          placeholder="product description"
        />
      </label>

        <label for="condition">
        Condition
        <input
          id="condition"
          type="condition"
          v-model="condition"
          placeholder="product condition"
        />
      </label>

      <input type="submit" value="Add" />
    </form>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex';

export default {
    name: 'CreateProduct',
    computed: {
        ...mapFields('products', [
            'createProduct.name', 
            'createProduct.price', 
            'createProduct.description', 
            'createProduct.condition'
        ])
    },
    methods: {
        ...mapActions('products', [
            'createProduct'
        ]),
        submitProduct() {
            const PRODUCT_DATA = {
                name: this.name,
                price: this.price,
                description: this.description,
                condition: this.condition
            }
            this.createProduct(PRODUCT_DATA)
        }
    }
}
</script>

<style scoped>
  
</style>
