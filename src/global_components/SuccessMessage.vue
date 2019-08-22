<template>
  <div>
    <v-alert
      :value="hasSuccess"
      prominent
      dark
      class="pa-0"
      type="success"
      tile
      height="10vh"
      border="bottom"
      color="success"
      transition="scale-transition">
      {{ successMessage }}
    <v-btn 
        icon 
        name="close"
        @click="hideSuccess()">
    <v-icon>mdi-close-circle</v-icon>
    </v-btn>
    </v-alert>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'global-success-message',
    computed: {
        ...mapState(['hasSuccess', 'successMessage'])
    },
    methods: {
        ...mapActions(['hideSuccess'])
    }
}
</script>

<style>
.v-alert--prominent .v-alert__icon:after {
    opacity: 0;
}
.v-alert {
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    text-align: center;
}
</style>