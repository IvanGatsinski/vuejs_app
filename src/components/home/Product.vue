<template>
    <v-card class="gallery__card">

     <dialog-product-image
        class="product__img"
        :productImgUrl="'https://cdn.vuetifyjs.com/images/cards/docks.jpg'">

       <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
      </v-card>
      
     </dialog-product-image>

      <v-card-text class="card__text-area py-0">
        <p class="mb-2 product__name">{{ name }}</p> 

        <v-btn 
            height="auto"
            class="mb-2 py-1"
            color="primary"
            :to="{ name: 'productDetails', params: { id: productId} }">
            Details
        </v-btn>
        <br/>
        <v-layout column>
            <v-flex>
                    Price: 
                    <span class="gallery__card-content" v-html="formatPrice(price)"></span>
                    <br>
                    Condition: 
                    <span class="gallery__card-content">{{ condition }}</span>
                    <br>
                    Author: 
                    <router-link  class="gallery__card-content"
                    :to="{ name: 'userProfile', params: { id: productCreator } }"
                    v-if="!isOwner"
                    >
                    {{ author }}
                    </router-link>
                    <span class="gallery__card-content" v-else>{{ author }}</span>
            </v-flex>
        </v-layout>
        
      </v-card-text>

        <v-icon 
            class="icon__item--in-cart" 
            :title="'Item is already in cart'" 
            color="light-green accent-2" 
            large v-show="isItemInCart">
            mdi-check-circle
        </v-icon>

        <div class="owner-rights" v-if="isOwner">
          <v-btn :to="{ name: 'editProduct', params: { id: productId } }" icon large class="owner-rights__item mx-1 py-1">
             <v-hover v-slot:default="{ hover }">
                <v-icon :title="'Edit Product'" :color="!hover ? 'cyan' : 'amber lighten-2'">mdi-square-edit-outline</v-icon>
             </v-hover>
          </v-btn>
        <dialog-product-delete 
        :productId="productId"
        :productName="name"
        :collection="'allProducts'"
        >
            <v-hover v-slot:default="{ hover }">
                <v-icon :title="'Delete Product'" :color="!hover ? 'cyan' : 'red lighten-2'">mdi-delete</v-icon> 
            </v-hover>
        </dialog-product-delete>
        </div>
    </v-card>
</template>

<script>
import { product_data_mixin, product_props_mixin } from '../../mixins/product_mixins'
import { mapState, mapActions, mapGetters } from 'vuex'
import DialogProductDelete from '@/dialogs/DialogProductDelete'
import DialogProductImage from '@/dialogs/DialogProductImage'

export default {
    name: 'Product',
    mixins: [ 
        product_data_mixin,
        product_props_mixin,
    ],
    components: {
        DialogProductDelete,
        DialogProductImage,
    },
    computed: {
        ...mapState('user', ['userProfile']),
        ...mapGetters('user', ['isAuthor']),
        ...mapGetters('products', ['formatPrice']),
        isOwner() {
            return this.isAuthor(this.productCreator)
        },
        isItemInCart() {
            return this.userProfile.cart.find(id => id === this.productId)
        },
    },
}
</script>

<style>
    .icon__item--in-cart {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .gallery__card {
        position: relative;
        background-color: rgba(255, 255, 255, 0.25) !important;
    }
    .gallery__card-content {
        font-size: 17px;
        font-weight: bold;
    }
    .gallery__card > .owner-rights {
        background-color: rgba(0, 0, 0, 0.45);
        position: absolute;
        top: 0;
        border-radius: 4px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .gallery__card > .owner-rights > .owner-rights__item {
        width: auto;
        height: 44px;
    }
    .product__img {
        cursor: zoom-in;
    }
    .product__name {
        font-size: 18px;
        font-style: italic;
        text-transform: capitalize;
        color: rgba(0, 0, 0, 0.753);
        margin: 0;
    }
</style>
