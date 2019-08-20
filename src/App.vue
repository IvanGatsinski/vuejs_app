<template>
  <div id="app">
        <nprogress-container>
       </nprogress-container>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    <v-app>
           <global-error-message></global-error-message>     
          <Header/>
        <v-content>
               <transition name="fade" mode="out-in">
                    <router-view></router-view>
               </transition>
        </v-content>
          <Footer/>
    </v-app>
  </div>
</template>

<script>
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
import Header from './components/common/Header'
import Footer from './components/common/Footer'

export default {
  name: 'App',
  components: {
    NprogressContainer,
    Header,
    Footer
  },
};
</script>

<style>
    /* Remove the leftover opacity on click */
.v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  opacity: 0;
}
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
  background-color: #3363b0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23ffffff' stroke-width='0' stroke-opacity='0.08' %3E%3Ccircle fill='%233363b0' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23446bb5' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%235374b9' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23607cbe' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%236d85c3' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23798ec7' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%238496cc' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23909fd1' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%239ba9d5' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%23a7b2da' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23b2bbdf' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23bdc5e3' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23c8cee8' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23d3d8ed' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23dee1f1' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23e9ebf6' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23f4f5fa' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23ffffff' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
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
