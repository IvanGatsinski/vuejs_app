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
            <v-btn class="ml-5" outlined text :to="`/product/details/${product._id}`">Details</v-btn>
            <dialog-product-delete 
                :productId="product._id"
                :productName="name"
                >
                <v-icon :title="'Delete Product'">mdi-delete</v-icon> 
        </dialog-product-delete>
          </v-list-item>
        </v-card>
</template>

<script>
import DialogProductDelete from '../../home/DialogProductDelete'
import { product_data_mixin, product_props_mixin } from '../../../mixins/product_mixins'
import { mapGetters } from 'vuex';
export default {
    name: 'MyProductsListitem',
    components: {
      DialogProductDelete,
    },
    mixins: [ 
      product_data_mixin, 
      product_props_mixin 
    ],
    computed: {
      ...mapGetters('products', ['productDate'])
    },

}
</script>

<style>

</style>
