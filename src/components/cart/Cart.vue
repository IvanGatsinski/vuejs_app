<template>
    <div>
        <h2>Cart List</h2>
            <v-container grid-list-xl>
                <v-layout wrap row justify-center>
                        <v-flex xs12 v-show="!cartProducts.length">
                            <v-alert 
                                class="text-center black--text"
                                text
                                prominent
                                elevation="12"
                                color="#fff"
                                icon="mdi-information-outline"
                                border="top"
                                >
                                Your cart is empty. Your need to add products to your cart.
                            </v-alert>
                        </v-flex>
                        <v-flex xs12 sm8 md6 lg5 xl4>
                            <cart-product v-for="product in cartProducts" 
                            :product="product"
                            :key="product._id">
                            </cart-product>
                        </v-flex>
                    <cart-checkout v-show="cartProducts.length"></cart-checkout>
                </v-layout>
            </v-container>
    </div>
</template>

<script>
import CartProduct from './CartProduct'
import CartCheckout from './CartCheckout'
import { fetchCartProducts } from '../../api_calls/products'
import store from '../../store/index'
import { mapState } from 'vuex';

export default {
    name: 'Cart',
    components: {
        CartProduct,
        CartCheckout
    },
    computed: {
    ...mapState('user', ['cartProducts']),
    },
    beforeRouteEnter(to, from, next) {
        let cartIds = store.state.user.userProfile.cart

        fetchCartProducts(cartIds)
            .then(res => {
                store.dispatch('user/fetchCartProducts', res.data)
                next()
            })
            .catch(err => console.log(err))
    }
}
</script>

<style>

</style>
