<template>
    <v-container grid-list-lg class="pa-5">
        <global-loader v-if="!allProducts"></global-loader>
        <v-layout row v-else>
                <v-flex 
                    class="ma-auto" xs8 
                    v-if="!allProducts.length">
                    <v-alert 
                        class="text-center black--text"
                        text
                        prominent
                        elevation="12"
                        color="#fff"
                        icon="mdi-information-outline"
                        border="top"
                        >
                        There aren't any products for sale
                    </v-alert>
                </v-flex>
                <v-flex 
                    v-else
                    xs12 sm6 md4 lg3 xl3
                    v-for="product in allProducts"
                    :key="product._id">
                    <Product 
                        :product="product">
                    </Product>
                </v-flex>
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
}
</script>

<style scoped>
.v-alert {
    position: relative;
    top: 5rem !important;
}
.list-products-enter-active, .list-products-leave-active {
  transition: all 1s;
}
.list-products-enter, .list-products-leave-to {
  opacity: 0;
  /* transform: translateY(60px); */
}
</style>
