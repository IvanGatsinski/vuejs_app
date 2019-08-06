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
import { fetchMyCartProducts } from './api_calls/products'

export default {
  name: 'App',
  components: {
    NprogressContainer,
    Header,
  },
  created() {
//     fetchMyCartProducts('5d2c76c15e24b02eee365e82')
// .then(res => console.log(res))
// .catch(err => console.log(err))

  }
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
  background-color: #0a406d;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%2364edff' stroke-width='0' stroke-opacity='0.45' %3E%3Ccircle fill='%230a406d' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23004774' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23004e7b' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23005582' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23005d88' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2300648d' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23006b92' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23007296' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%23007a99' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%2300819b' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%2300889d' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23008f9f' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2300979f' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23009e9f' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%2300a59f' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2300ac9d' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%2300b29c' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%231eb99a' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
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
