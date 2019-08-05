<template>
  <div id="app">
        <nprogress-container>
       </nprogress-container>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    <v-app>      
            <Header/>
        <v-content>
               <transition name="fade" mode="out-in">
                    <router-view></router-view>
               </transition>
        </v-content>
    </v-app>
  </div>
</template>

<script>
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
import Header from './components/common/Header'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    NprogressContainer,
    Header,
  },
};
</script>

<style>
.v-text-field .v-label {
  top: 0 !important;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
/* body {
  font-family: sans-serif;
  margin: 42px;
} */
</style>
