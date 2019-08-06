<template>
    <v-container grid-list-lg class="pa-5">
        <v-layout row>
            <transition-group name="list-products" tag="div" class="layout row wrap">
                <v-flex 
                xs12 sm6 md4 lg3 xl2
                v-for="product in allProducts"
                :key="product._id">
                    <Product 
                        :creatorId="product._acl.creator"
                        :name="product.name"
                        :price="Number(product.price)"
                        :productId="product._id"
                        :dateCreated="product._kmd.ect"
                        :description="product.description"
                        :condition="product.condition"
                        >
                    </Product>
                </v-flex>
            </transition-group>
        </v-layout>
    </v-container>
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
  /* transform: translateY(60px); */
}
</style>
