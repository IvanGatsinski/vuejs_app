<template>

      <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon large class="owner-rights__item mx-1 py-1">
              <slot name="default"></slot>
           </v-btn>
      </template>
      <v-card color="#FAFAFA" :hidden="isHidden">
        <v-card-title class="headline">
          Delete {{ productName }}?
        </v-card-title>
        <v-card-text>Once deleted product cannot be retrieved.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn 
            class="font-weight-bold" 
            text 
            @click="dialog = false">Cancel
            </v-btn>
            <v-btn 
            class="font-weight-bold" 
            text 
            @click="deleteProduct(productId)">
            Agree
            </v-btn>                                                               
        </v-card-actions>
      </v-card>
  
    <v-wait for="delete progress loader">
        <template slot="waiting">
    <v-dialog
        v-model="isLoading"
        hide-overlay
        persistent
        width="300">
        <v-card
            color="primary"
            dark>
            <v-card-text>
            Deleting product...
            <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
            ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
        </template>
    </v-wait>
    </v-dialog>

</template>
<script>
import { mapActions, mapState } from "vuex";

export default {

    name: 'DialogProductDelete',
    data () {
      return {
        dialog: false,
        isHidden: false,
        isLoading: true,
      }
    },
    props: {
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true
      },
    },
    methods: {
      ...mapActions('products', ['removeProduct']),
      deleteProduct(productId) {
          this.isHidden = true
          this.removeProduct(productId)
      },
    },
}
</script>
