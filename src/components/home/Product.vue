<template>
    <v-card>
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      <v-card-title class="align-end fill-height">{{ fixedProductPrice }}</v-card-title>
      </v-img>

      <v-card-text class="black--text grey lighten-1">{{ name }}  
      </v-card-text>

      <v-card-actions class="grey lighten-2">
        <v-btn icon :disabled="isProductOwner" @click="addOrRemoveFromFavs(productId)">
          <v-icon large :color="productIsInFavs">mdi-heart</v-icon>
        </v-btn>
            <v-spacer></v-spacer>
        <div v-if="isProductOwner">
          <v-btn class="light-blue darken-1 pa-0">Edit</v-btn>
          <v-btn @click="deleteProduct(productId)">Remove</v-btn>
        </div>
      </v-card-actions>

        <v-card-text>
            {{ datePublished }}
        </v-card-text>
    </v-card>
<!-- 
        <p>Description: {{ description }}</p>
        <p>Condition: {{ condition }}</p>
        <p>Date created: {{ dateCreated }}</p> -->

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Product',
    computed: {
        ...mapState('user', [
            'userProfile',
        ]),
        productIsInFavs() {
            const FAVOURITE_PRODUCTS = this.userProfile.favouriteProducts

            return FAVOURITE_PRODUCTS && FAVOURITE_PRODUCTS.includes(this.productId) ?
            'red lighten-1' : ''
        },
        isProductOwner() {
            return this.creatorId === this.userProfile._id ? true : false
        },
        fixedProductPrice() {
            return `${Number(this.price).toFixed(2)} лв.`
        },
        datePublished() {
            let date = new Date(this.dateCreated),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();

            month < 10 ? month = `0${month}` : false
            day < 10 ? day = `0${day}` : false
        
            return `Публикувано на ${day}-${month}-${year} г.`
        }
    },
    methods: {
        ...mapActions('products', ['removeProduct', 'addOrRemoveProductInFavs']),
        deleteProduct(productId) {
            this.removeProduct(productId)
        },
        addOrRemoveFromFavs(productId) {
            this.addOrRemoveProductInFavs(productId)
        },
    },
    props: {
        productId: {
            type: String,
            required: true,
        },
        creatorId: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },

}
</script>

<style scoped>

</style>
