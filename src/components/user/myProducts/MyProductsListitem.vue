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
                <v-list-item-subtitle>{{ productPublishedDate(dateCreated) }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-btn class="ml-5" outlined="" text :to="`/product/details/${product._id}`">Детайли</v-btn>
          </v-list-item>
        </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'MyProductsListitem',
    data() {
        return {
            name: this.product.name,
            author: this.product.author,
            productCreator: this.product._acl.creator,
            dateCreated: this.product._kmd.ect
        }
    },
    computed: {
      ...mapGetters('products', ['productPublishedDate'])
    },
    props: {
        product: {
            type: Object,
            required: true,
        }
    },
}
</script>

<style>

</style>
