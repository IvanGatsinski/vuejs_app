<template>
  <v-app-bar app color="#3363b0a8" dark> 
    <v-app-bar-nav-icon class="hidden-sm-and-up"></v-app-bar-nav-icon>

    <v-toolbar-title v-show="userIsLogged">{{ userGreeting }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="!userIsLogged">
            <v-btn 
            :to="{ name: 'register' }" 
            class="ma-1 py-1" 
            color="light-blue darken-4">
              Register
            </v-btn>
            <v-btn :to="{ name: 'login' }" class="ma-1 py-1" color="light-blue darken-4">
              Login
            </v-btn>
    </template>

    <template v-if="userIsLogged">

      <v-btn :to="{ name: 'cart' }" :title="'View Cart'" :color="nonEmptyCartColour" icon class="fav__items-btn">
          <v-icon medium>mdi-cart-outline</v-icon>
          <span class="fav__items-count">
            {{ productsInCart }}
          </span>
      </v-btn>
    
      <v-btn :to="{ name: 'home' }" small class="ma-1" color="light-blue darken-4">
          <v-icon left color="yellow lighten-2">mdi-home</v-icon> Home
      </v-btn>

      <v-btn :to="{ name: 'myProfile' }" small class="ma-1" color="light-blue darken-4">
          <v-icon left color="yellow lighten-2">mdi-account-circle</v-icon> Profile
      </v-btn>
  
      <v-btn small class="ma-1" color="light-blue darken-4" @click="logoutUser()">
          <v-icon left color="yellow lighten-2">mdi-logout</v-icon> Logout
      </v-btn>
        
    </template>

  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  data() {
      return {
        drawer: false,
        group: null,
      }
  },
  watch: {
      group () {
        this.drawer = false
    },
  },
  computed: {
    ...mapState('user',[
      'userProfile',
      'authtoken',
    ]),
    userGreeting() {
      return `Hello ${this.userProfile.username}`;
    },
    userIsLogged() {
      return this.authtoken
    },
    nonEmptyCartColour() {
      return this.userProfile.cart.length ? 'light-green accent-2' : ''
    },
    productsInCart() {
      return this.userProfile.cart.length
    },
  },
  methods: {
    ...mapActions('auth',[
        'logout'
    ]),
    logoutUser() {
      this.logout()
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
      opacity: 0;
    }
    .v-application .light-blue {
          background-color: #03a8f4ab !important;
    }
  
    .fav__items-btn:hover {
        background: transparent;
    }
    .fav__items-icon--color {
        color: #EF5350 !important;
    }
    span.fav__items-count {
        position: relative;
        transform: translate(0px, 5px);
        font-weight: bold;
        font-size: 16px;
    }
    .v-btn__content {
        margin-left: -30px;
    }
</style>