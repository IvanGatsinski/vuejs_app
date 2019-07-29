<template>
  <div id="app">
     <nprogress-container>
       </nprogress-container>
    <Header/>
    <transition 
        name="fade"
        mode="out-in">
      <router-view></router-view>
    </transition>
    
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
  methods: {
    ...mapActions('auth',[
      'getToken'
    ]),

  },
  created() {
    this.getToken()
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #208b5b;
  text-decoration: none;
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
