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
      
    </v-img>
  <v-card-title class="align-end fill-height">{{ productDetails.name }}</v-card-title>
    <v-card-text>
    
      <span class="text--primary">
        <span v-if="!isAuthor(productDetails._acl.creator)"
        >
        Author: <router-link 
        :to="{ name: 'userDetails', params: { id:productDetails._acl.creator } }"
        >{{ productDetails.author }}
        </router-link>
        </span>

        <span v-else>Author: {{ productDetails.author }}</span><br>
        <span>Price: {{ productDetails.price }}</span><br>
        <span>Condition: {{ productDetails.condition }}</span><br>
       
      </span>
    <span>{{ publishedDate }}</span><br>
    <span>{{ lastEdittedDate }}</span><br>
    </v-card-text>

    <v-card-actions @click="show = !show" class="rgba(31, 77, 107, 0.5) py-0">
      <v-btn
        text
        >
        {{ show ? 'Hide description' : 'Show description' }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
            {{ show ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <v-card v-show="show">
        <v-card-text class="card-description__text">
          {{ productDetails.description }}
        </v-card-text>
      </v-card>
    </v-expand-transition>

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
   </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { fetchProduct } from '../../api_calls/products'
import store from '../../store/index'
export default {
    name: 'ProductDetails',
    data() {
      return {
        show: false
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
        this.addToCart(this.productDetails._id)
      },
      removeItemFromCart() {
        this.removeFromCart(this.productDetails._id)
      },
    },
    computed: {
      ...mapState('products', [
        'productDetails', 
        'allProducts'
        ]),
      ...mapGetters('user',[
        'isItemInCart',
        'isAuthor'
        ]),
      ...mapGetters('products', [
        'productPublishedDate', 
        'productLastEdittedDate'
        ]),
      publishedDate() {
        return this.productPublishedDate(this.productDetails._kmd.ect)
      },
      lastEdittedDate() {
        return this.productLastEdittedDate(this.productDetails._kmd.lmt)
      },
      itemIsInCart() {
        return this.isItemInCart(this.productDetails._id)
      },
      isNotAuthor() {         
        let authorId = this.productDetails._acl.creator
        return !this.isAuthor(authorId)
      }
    },
    beforeRouteEnter(to, from, next) {
      fetchProduct(to.params.id)
        .then(res => {
          
          store.commit('products/setProductDetails', res.data)
          next()
        })
        .catch(err => console.log(err));
    }
}
</script>

<style scoped>
  .v-card.v-sheet.theme--light {
    background: rgba(255, 255, 255, 0.35);
  }
  .card-description__text {
    background: rgba(255, 255, 255, 0.35);
  }
</style>
