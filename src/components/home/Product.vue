<template>
    <v-card class="gallery__card">
      <v-img
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      <v-card-title class="align-end fill-height">{{ formattedPrice }}</v-card-title>
      </v-img>

      <v-card-text class="black--text grey lighten-1">{{ name }}  
      </v-card-text>
        <div class="owner-rights" v-if="isOwner">
        
          <v-btn @click="fetchEditProductData(productId)" icon large class="owner-rights__item mx-1 py-1">
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

        <v-card-text>
            {{ datePublished }}
        </v-card-text>
    </v-card>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DialogProductDelete from './DialogProductDelete'
export default {
    name: 'Product',
    components: {
        DialogProductDelete
    },
    methods: {
        ...mapActions('products', [
            'fetchProduct'
        ]),
        fetchEditProductData(productId) {
            this.fetchProduct(productId)
        }
    },
    computed: {
        ...mapState('user', [
            'userProfile',
        ]),
        isOwner() {
            return this.creatorId === this.userProfile._id ? true : false
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

<style>
    .gallery__card {
        position: relative;
    }
    .gallery__card > .owner-rights {
        background-color: rgba(0, 0, 0, 0.75);
        position: absolute;
        transform: translate(0em, -15.9em);
        border-radius: 4px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .gallery__card > .owner-rights > .owner-rights__item {
        width: auto;
        height: 44px;
    }
</style>
