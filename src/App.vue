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
.section__heading {
    position: relative;
    /* font-weight: bold; */
    font-size: 32px;
    margin-top: 8px;
    text-align: center;
    background: -webkit-linear-gradient(rgba(0, 0, 0, 0.89), rgba(118, 176, 253, 0.589));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.section__heading::before {
    position: absolute;
    bottom: -5px;
    right: 15vw;
    content: '';
    width: 70vw;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
}
    /* Remove the leftover opacity on click */
/* .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  
} */
.v-btn--active:before {
  background: rgb(255, 0, 0);
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
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='0' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d8daff'/%3E%3Cstop offset='1' stop-color='%23d8daff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='1200' cy='800' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ddd9ff'/%3E%3Cstop offset='1' stop-color='%23ddd9ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='c' cx='600' cy='0' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23b3b2ff'/%3E%3Cstop offset='1' stop-color='%23b3b2ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='d' cx='600' cy='800' r='600' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='e' cx='0' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23b0b5ff'/%3E%3Cstop offset='1' stop-color='%23b0b5ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='f' cx='1200' cy='0' r='800' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23bbb3ff'/%3E%3Cstop offset='1' stop-color='%23bbb3ff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' width='1200' height='800'/%3E%3Crect fill='url(%23c)' width='1200' height='800'/%3E%3Crect fill='url(%23d)' width='1200' height='800'/%3E%3Crect fill='url(%23e)' width='1200' height='800'/%3E%3Crect fill='url(%23f)' width='1200' height='800'/%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;
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

</style>
