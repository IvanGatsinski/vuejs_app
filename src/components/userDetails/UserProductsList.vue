<template>
    <v-container>
        <v-layout justify-center>
            <v-flex xs12 sm12 md8 lg6 xl6>
                <p v-if="!randomUserProducts">WAIT......</p>
                
                <product-item 
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
            'getRandomUserProducts',
            'clearRandomUserProducts'
        ])
    },
    created() {
        this.getRandomUserProducts(this.$route.params.id)
    },
    beforeDestroy() {
        this.clearRandomUserProducts()
    }
}
</script>

<style scoped>

</style>