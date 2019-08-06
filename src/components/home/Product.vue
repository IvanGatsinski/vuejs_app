<template>
    <v-card class="cyan lighten-5 gallery__card">

     <dialog-product-image
        :productImgUrl="'https://cdn.vuetifyjs.com/images/cards/docks.jpg'">

       <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
      </v-card>
      
     </dialog-product-image>

      <v-card-text class="py-0">
        Име на продукта: {{ name }} 
        <br/>
        Състояние: {{ condition === 'Old' ? 'Използвано' : 'Ново' }}
        <br/>
        {{ datePublished }}
        <br/>
        <v-btn text :to="`/product/details/${productId}`">Виж Повече</v-btn>
      </v-card-text>
      
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

    <v-card-actions @click="show = !show" class="cyan lighten-5 py-0">
      <v-btn
        text
        >
        {{ show ? 'hide details' : 'show details' }}
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
        <v-card-text>
          Пълно описание: {{ description }}
        </v-card-text>
      </v-card>
    </v-expand-transition>

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
            show: false,
        }
    },
    computed: {
        ...mapState('user', ['userProfile']),
        ...mapGetters('user', ['isAuthor']),
        isOwner() {
            return this.isAuthor(this.creatorId)
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
        description: {
            type: String,
            required: true,
        },
        condition: {
            type: String,
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
    .v-responsive__content {
        cursor: zoom-in;
    }
</style>
