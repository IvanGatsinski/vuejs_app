<template>
  <div>
    <v-alert
      :value="hasError"
      prominent
      dark
      class="pa-0"
      type="error"
      tile
      height="10vh"
      color="orange darken-3"
      transition="scale-transition">
      {{ errorMessage }}
    <v-btn 
        icon 
        name="close"
        @click="hideError()">
    <v-icon>mdi-close-circle</v-icon>
    </v-btn>
    </v-alert>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'global-error-message',
    computed: {
        ...mapState(['hasError', 'errorMessage'])
    },
    methods: {
        ...mapActions(['hideError'])
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