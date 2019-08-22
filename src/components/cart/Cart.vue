<template>
    <div>
        <div class="section__heading mb-4">My cart</div>
            <v-container grid-list-xl>
                <global-loader v-if="!cartProducts">
                </global-loader>
                <v-layout
                 v-else
                 wrap row justify-center>
                    <v-flex xs12 sm10 md8 lg6 xl4
                     v-if="!cartProducts.length"
                     class="text-center">
                        <global-empty-message>
                        Your cart is empty. Your need to add products to your cart.
                        </global-empty-message>
                    </v-flex>
                    <v-flex
                    v-else
                     xs12 sm8 md6 lg5 xl4>
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
        CartCheckout,
    },
    computed: {
    ...mapState('user', ['cartProducts']),
    },
    beforeRouteEnter(to, from, next) {
        let cartIds = store.state.user.userProfile.cart

        fetchCartProducts(cartIds)
            .then(res => {
                console.log(res.data)
                store.dispatch('user/getCartProducts', res.data)
                next()
            })
            .catch(err => console.log(err))
    }
}
</script>

<style>

</style>
