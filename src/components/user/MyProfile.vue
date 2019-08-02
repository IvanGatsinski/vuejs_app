<template>
  <div>
    <h1>My products for sale!</h1>
    
        <h2 v-for="product in myProducts" :key="product._id">{{ product.name }}</h2>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import { fetchAllProducts } from "../../api_calls/products";

export default {
  name: "MyProfile",
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapState("products", ["myProducts"])
  },
  methods: {
    ...mapActions("products", ["fetchMyProducts"])
  },
  created() {
    this.fetchMyProducts(this.userProfile._id);
  },
  mounted() {
    console.log(this.myProducts);
  }
};
</script>

<style>
</style>
