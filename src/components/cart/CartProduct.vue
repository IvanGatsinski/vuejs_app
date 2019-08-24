<template>
    <v-card 
      class="mb-3"
      color="rgba(31, 77, 107, .5)" dark 
      >
      <v-list-item three-line>
        <v-list-item-avatar size="125" tile>
          <v-img :src="product.imageUrl"></v-img>
            </v-list-item-avatar>
              <v-list-item-content class="align-self-start">
                <v-list-item-title :title="product.name" class="headline mb-2">
                  {{ product.name }}
                </v-list-item-title>
              <v-list-item-subtitle>Author: {{ product.author }}</v-list-item-subtitle>
               <v-list-item-subtitle>Price: {{ product.price }}</v-list-item-subtitle>
               <v-list-item-subtitle> </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <v-layout column>
                <v-btn 
                  class="mb-2" 
                  :to="`/product/details/${product._id}`"
                  color="#303f9f">
                  Details
                </v-btn>
                <v-wait :for="vWaitArrayItem">
                  <template slot="waiting">
                    <v-btn 
                      disabled
                      loading
                      width="100%">
                      Remove
                    </v-btn>
                      
                  </template>
                    <v-btn 
                      rounded
                      width="100%"
                      @click="removeItem()" 
                      color="#303f9f">
                      Remove
                    </v-btn>
                </v-wait>
              </v-layout>
            </v-list-item-content>
          </v-list-item>
        </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'CartProduct',
    props: {
      product: {
        required: true,
        type: Object
      }
    },
    computed: {
      vWaitArrayItem() {
        return `remove cart item loading ${this.product._id}`
      }
    },
    methods: {
      ...mapActions('user', ['removeFromCart']),
      removeItem() {
        this.removeFromCart(this.product._id)
      }
    }
}
</script>

<style scoped>
  .v-sheet.theme--dark {
    background: rgba(31, 77, 107, 0.5);
  }
</style>
