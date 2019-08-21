<template>
    <v-container>
        <v-layout justify-center>
            <global-loader v-if="!randomUserProducts">
            </global-loader>
            <v-flex
            v-else
            xs12 sm12 md8 lg6 xl6>
                <global-empty-message v-if="!randomUserProducts.length">
                    There aren't any products for sale yet
                </global-empty-message>
                <product-item
                    v-else 
                    v-for="product in randomUserProducts"
                    :key="product._id"
                    :product="product">
                </product-item>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import UserProductsListItem from './UserProductsListItem'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'UserProductsList',
    components: {
        'product-item' : UserProductsListItem
    },
    computed: {
        ...mapState('products', ['randomUserProducts'])
    },
    methods: {
        ...mapActions('products', [
            'getUserProducts',
            'clearUserProducts'
        ])
    },
    created() {
        this.getUserProducts(this.$route.params.id)
    },
    beforeDestroy() {
        this.clearUserProducts()
    }
}
</script>

<style scoped>

</style>