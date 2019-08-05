<template>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon large class="owner-rights__item mx-1 py-1">
              <slot></slot>
           </v-btn>
      </template>
      <v-card color="#FAFAFA">
        <v-card-title class="headline">Are you sure you want to delete it?</v-card-title>
        <v-card-text>Once deleted product cannot be retrieved.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn class="font-weight-bold" text @click="dialog = false">Cancel</v-btn>
            <v-btn class="font-weight-bold" text @click="deleteProduct(productId)">Agree</v-btn>                                                               
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapActions } from "vuex";

export default {

    name: 'DialogProductDelete',
    data () {
      return {
        dialog: false,
      }
    },
    props: {
      productId: {
        type: String,
        required: true,
      }
    },
    methods: {
        ...mapActions('products', [
            'removeProduct',
        ]),
        deleteProduct(productId) {
            this.removeProduct(productId)
        },
    },
}
</script>
