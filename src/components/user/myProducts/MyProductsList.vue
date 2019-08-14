<template>
    <v-container grid-list-xl>
        <v-layout row justify-center>
            <v-flex xs12 sm12 md8 lg6 xl6>
                <v-alert 
                    class="text-center black--text"
                    v-show="!myProducts.length"
                    text
                    prominent
                    elevation="12"
                    color="#fff"
                    icon="mdi-information-outline"
                    border="top"
                    >
                    You don't have any products for sale
                </v-alert>
                <my-product
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
// import { fetchMyProducts } from '../../../api_calls/products';

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
    // beforeRouteEnter(to, from, next) {
    //     console.log(store.state.user.userProfile._id);
        
    //    if (!store.state.products.allProducts) {
    //         store.dispatch('products/fetchMyProducts', store.state.user.userProfile._id)
    //         next()
    //    }
    //    else {
    //         next()
    //    }
    // },

}
</script>

<style>

</style>
