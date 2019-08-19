<template>
    <v-flex xs12 sm4 md4 lg4 xl4>
    <v-card fixed class="mx-auto" outlined>
        <v-list-item three-line>
        <v-list-item-content>
            <div class="overline mb-4">CHECKOUT TO BUY THE PRODUCTS</div>
            <v-list-item-title class="headline mb-1">Total price: {{ cartTotalPrice }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>

        <v-card-actions>
            <v-wait for="checkout loading btn" class="checkout-btn-wrapper">
                <template slot="waiting">
                    <v-btn 
                    loading
                    disabled
                    width="100%">
                    Checkout
                    </v-btn>
                </template>
                    <v-btn 
                    @click="checkout()"
                    width="100%" 
                    color="dark blue">
                    Checkout
                    </v-btn>
            </v-wait>

        </v-card-actions>
    </v-card>
</v-flex>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'CartCheckout',
    computed: {
        ...mapState(['isLoading']),
        ...mapGetters('user', ['cartTotalPrice'])
    },
    methods: {
        ...mapActions('user', ['checkoutCart']),
        ...mapActions(['enableLoading']),
        checkout() {
            this.checkoutCart()
        }
    }
}
</script>

<style scoped>
    .v-card {
        position: sticky;
        top: 15vh;
    }
    .checkout-btn-wrapper {
        width: 100%;
    }
</style>
