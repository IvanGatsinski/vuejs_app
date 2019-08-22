<template>
  <v-row justify="center">
    <v-dialog v-model="cartProductDeleted" persistent max-width="290">
      <v-card>
        <v-card-text class="black--text">Some product(s) from your cart has been sold or deleted</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeDeletedCartProductDialog()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'DialogRemovedItemCart',
    methods: {
        ...mapActions('user', ['closeDeletedCartProductDialog'])
    },
    computed: {
        ...mapState('user', ['cartProductDeleted']),
    }
}
</script>