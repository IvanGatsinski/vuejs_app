<template>
    <div>
        <h1 class="text-center">Welcome to my page</h1>
        <v-container grid-list-xl>
            <v-layout row>
                <v-flex class="text-right">
                    <router-link to="/product/create">
                    <v-btn small class="ma-1" color="white--text light-blue darken-4">
                    <v-icon left color="yellow lighten-2">mdi-plus-circle-outline</v-icon> Add product
                    </v-btn>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-container>
      <Products></Products>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Products from './Products'

export default {
    name: 'Home',
    components: {
        Products
    },
}
</script>

<style>

</style>
