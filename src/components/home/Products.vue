<template>
    <div>
        <Product 
        v-for="product in allProducts"
        :key="product._id"
        :creatorId="product._acl.creator"
        :name="product.name"
        :price="Number(product.price)"
        :description="product.description"
        :condition="product.condition"
        ></Product>
    </div>
</template>

<script>
import Product from './Product'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Products',
        components: {
        Product
    },
    computed: {
        ...mapState('products', [
            'allProducts',
        ])
    },
    methods: {
        ...mapActions('products',[
            'fetchAllProducts'
        ])
    },
    created() {
        this.fetchAllProducts()
    }
}
</script>

<style>

</style>
