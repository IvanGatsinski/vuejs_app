<template>
    <v-card class="cyan lighten-5 gallery__card">

     <dialog-product-image
        :productImgUrl="'https://cdn.vuetifyjs.com/images/cards/docks.jpg'">

       <v-card>
          <v-img class="product__img" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
      </v-card>
      
     </dialog-product-image>
        
      <v-card-text class="py-0">
        Име на продукта: {{ name }} 
        <br/>
        Състояние: {{ condition === 'Old' ? 'Използвано' : 'Ново' }}
        <br/>
        {{ datePublished }}
        <br/>
        <v-btn text :to="`/product/details/${productId}`">Детайли</v-btn>
      </v-card-text>

        <v-icon 
        class="icon__item--in-cart" 
        :title="'Item is already in cart'" 
        color="yellow" 
        large v-show="isItemInCart">mdi-check-decagram</v-icon>

        <div class="owner-rights" v-if="isOwner">
        
          <v-btn :to="`/product/edit/${productId}`" icon large class="owner-rights__item mx-1 py-1">
             <v-hover v-slot:default="{ hover }">
                <v-icon :title="'Edit Product'" :color="!hover ? 'cyan' : 'amber lighten-2'">mdi-square-edit-outline</v-icon>
             </v-hover>
          </v-btn>
        <dialog-product-delete :productId="productId">
            <v-hover v-slot:default="{ hover }">
                <v-icon :title="'Delete Product'" :color="!hover ? 'cyan' : 'red lighten-2'">mdi-delete</v-icon> 
            </v-hover>
        </dialog-product-delete>
        </div>
    </v-card>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import DialogProductDelete from './DialogProductDelete'
import DialogProductImage from './DialogProductImage'

export default {
    name: 'Product',
    components: {
        DialogProductDelete,
        DialogProductImage,
    },
    data() {
        return {
            productId: this.product._id,
            name: this.product.name,
            price: this.product.price,
            description: this.product.description,
            condition: this.product.condition,
            creatorId: this.product._acl.creator,
            dateCreated: this.product._kmd.ect,
        }
    },
    computed: {
        ...mapState('user', ['userProfile']),
        ...mapGetters('user', ['isAuthor']),
        isOwner() {
            return this.isAuthor(this.creatorId)
        },
        isItemInCart() {
            return this.userProfile.cart.find(id => id === this.productId)
        },
        formattedPrice() {
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
    props: {
        product: {
            required: true,
            type: Object,
        }
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
    }
    .gallery__card > .owner-rights {
        background-color: rgba(0, 0, 0, 0.75);
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
</style>
