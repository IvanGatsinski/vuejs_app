<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="800px"
    >
      <template v-slot:activator="{ on }">
        <v-card>
          <v-img height="220px" v-on="on" :src="productImgUrl"></v-img>
      </v-card>
      </template>

      <slot></slot>
      
    </v-dialog>
  </div>
</template>

<script>
export default {
    name: 'DialogProductImage',
    data() {
        return {
            dialog: false,
        }
    },
    props: {
        productImgUrl: {
            type: String,
            required: true,
        }
    }
}
</script>
