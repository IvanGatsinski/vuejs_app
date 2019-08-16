<template>
    <v-container grid-list-xl>
        <global-loader
         v-if="!myProducts">
         </global-loader>
        <v-layout 
        v-else
        row justify-center>
            <v-flex 
            xs12 sm12 md8 lg6 xl6>
                <global-empty-message
                v-if="!myProducts.length">
                You don't have any products for sale
                </global-empty-message>
                <my-product
                    v-else
                    v-for="product in myProducts"
                    :product="product"
                    :key="product._id">
                </my-product>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MyProductListItem from './MyProductsListitem'

import store from '../../../store';

export default {
    name: 'MyProductsList',
    components: {
        'my-product' : MyProductListItem
    },
    computed: {
        ...mapState('products', ['allProducts', 'myProducts']),
        ...mapState('user', ['userProfile']),
    },
    methods: {
        ...mapActions('products', ['getMyProducts'])
    },
    created() {
        this.getMyProducts(this.userProfile._id)
    },
}
</script>

<style>

</style>
