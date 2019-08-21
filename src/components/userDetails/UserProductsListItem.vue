<template>
    <v-card 
      class="mb-3"
      color="rgba(31, 77, 107, .5)" dark 
      >
        <v-list-item>
        <v-list-item-avatar size="50">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
        </v-list-item-avatar>
            <v-list-item-content class="align-self-start">
            <v-list-item-title class="headline mb-2">
                {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ productDate(dateCreated, 'published') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn 
        class="ml-5" 
        outlined text 
        :to="`/product/details/${product._id}`">
        Details
        </v-btn>
           <dialog-product-delete
            v-if="isAuthor(productCreator)"
            :productId="product._id"
            :productName="product.name"
            :collection="'myProducts'"
            >
            <v-hover v-slot:default="{ hover }">
                <v-icon :title="'Delete Product'" :color="!hover ? 'cyan' : 'red lighten-2'">mdi-delete</v-icon> 
            </v-hover>
        </dialog-product-delete>
        </v-list-item>
    </v-card>
</template>

<script>
import { product_data_mixin, product_props_mixin } from '../../mixins/product_mixins'
import { mapGetters, mapActions } from 'vuex';
import DialogProductDelete from '../home/DialogProductDelete'
export default {
    name: 'UserProductsList',
    components: {
        DialogProductDelete
    },
    mixins: [ 
        product_data_mixin,
        product_props_mixin,
    ],
    computed: {
        ...mapGetters('products', ['productDate']),
        ...mapGetters('user', ['isAuthor'])
    },
    methods: {
        ...mapActions('products', ['removeProduct'])
    },
    created() {
        console.log(this.isAuthor(this.productCreator))
    }
}
</script>

<style scoped>
    .v-liste-item {
        color: black;
    }
</style>