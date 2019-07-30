<template>
    <transition-group name="list-products"  tag="ul">
        <Product 
        v-for="product in allProducts"
        :key="product._id"
        :creatorId="product._acl.creator"
        :name="product.name"
        :price="Number(product.price)"
        :description="product.description"
        :condition="product.condition"
        :productId="product._id"
        :dateCreated="product._kmd.ect"
        ></Product>
    </transition-group>
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
        ]),
    },
    created() {
        this.fetchAllProducts()
    }
}
</script>

<style>
.list-products-enter-active, .list-products-leave-active {
  transition: all 1s;
}
.list-products-enter, .list-products-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
</style>
