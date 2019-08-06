<template>
   <v-container>
       <v-layout row justify-center>
           <v-flex xs12 sm10 md8 lg6 xl6>
               <v-card
    class="mx-auto"
  >
    <v-img
      class="white--text"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title class="align-end fill-height">Top 10 Australian beaches</v-card-title>
    </v-img>

    <v-card-text>
      <span>Number 10</span><br>
      <span class="text--primary">
        <span>Whitehaven Beach</span><br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </span>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="backOnePage()"
        color="orange"
      >
        back
      </v-btn>

    <v-container v-if="isNotAuthor">
      <v-btn
        v-if="itemIsInCart"
        color="success"
        @click="removeItemFromCart()"
      >
        Remove from Cart
      </v-btn>
      <v-btn
        v-else
        color="orange"
        @click="addItemToCart()"
      >
        Add to cart
      </v-btn>
    </v-container>

    </v-card-actions>
      </v-card>
          </v-flex>
      </v-layout>
              
    <template>
      <v-text-field v-model="quantity" :value="quantity">
        <v-icon @click="increment()" slot="append" color="red">mdi-plus</v-icon>
        <v-icon @click="decrement()" slot="prepend" color="green">mdi-minus</v-icon>
      </v-text-field>
    </template>
     {{ quantity }}
   </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '../../store/index'
export default {
    name: 'ProductDetails',
    data() {
      return {
        quantity: 0,
        productId: this.$route.params.id,
      }
    },
    methods: {
      ...mapActions('user', [
        'addToCart',
        'removeFromCart'
      ]),
      backOnePage() {
        this.$router.back(-1)
      },
      addItemToCart() {
        this.addToCart(this.productId)
      },
      removeItemFromCart() {
        this.removeFromCart(this.productId)
      },
      increment() {
        this.quantity++
      },
      decrement() {
        this.quantity--
      }
    },
    computed: {
      ...mapState('products', ['productDetails']),
      ...mapGetters('user',['isItemInCart','isAuthor']),
                  
      itemIsInCart() {
        return this.isItemInCart(this.productId)
      },
      isNotAuthor() {
        if (this.productDetails) {

          let authorId = this.productDetails._acl.creator
          return !this.isAuthor(authorId)
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('products/setProductDetails', to.params.id)
      next()
    }
}
</script>

<style scoped>

</style>
