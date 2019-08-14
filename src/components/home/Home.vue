<template>
    <div>
        <h1 class="text-center">Welcome to my page</h1>
        <v-container grid-list-xl>
            <v-layout row>
                <v-flex class="text-right">
                    <v-btn :to="{ name: 'createProduct' }" small class="ma-1" color="white--text light-blue darken-4">
                    <v-icon left color="yellow lighten-2">mdi-plus-circle-outline</v-icon> Add product
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
      <Products></Products>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Products from './Products'

export default {
    name: 'Home',
    components: {
        Products
    },
    methods: {
    ...mapActions('products',[
        'fetchAllProducts'
        ]),
    ...mapActions('user',[
        'wasCartProductDeleted'
        ]),
    },
    computed: {
    ...mapState('products', ['allProducts'])
    },
    created() {
        this.wasCartProductDeleted()
        this.fetchAllProducts()
    },
}
</script>

<style scoped>

</style>
