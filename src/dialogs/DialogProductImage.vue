<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="800px"
    >
      <template v-slot:activator="{ on }">
        <v-card>
         <div class="img-wrapper">
            <img v-on="on" class="inner-img" :src="productImgUrl" alt="product image"/>
         </div>
          <!-- <v-img height="100%" ></v-img> -->
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

<style>
  .img-wrapper {
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-wrapper > img {
    max-height: 250px;
  }
</style>
