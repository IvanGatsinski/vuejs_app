<template>
  <v-app-bar app color="light-blue" dark> 
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title v-show="userIsLogged">{{ userGreeting }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="!userIsLogged">
        <router-link to="/register">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-4">
            Register
            </v-btn>
        </router-link>
        <router-link to="/login">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-4">
            Login
            </v-btn>
        </router-link>
    </template>

    <template v-if="userIsLogged">
        <v-btn :color="nonEmptyCartColour" icon class="fav__items-btn">
            <v-icon medium>mdi-cart-outline</v-icon>
            <span class="fav__items-count">
              {{ productsInCart }}
            </span>
        </v-btn>
        <router-link exact to="/">
            <v-btn small class="ma-1" color="light-blue darken-4">
                <v-icon left color="yellow lighten-2">mdi-home</v-icon> Home
            </v-btn>
        </router-link>  
        <router-link to="/myProfile">
            <v-btn small class="ma-1" color="light-blue darken-4">
                <v-icon left color="yellow lighten-2">mdi-account-circle</v-icon> Profile
            </v-btn>
        </router-link>
        
            <v-btn small class="ma-1" color="light-blue darken-4" @click="logoutUser">
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
    nonEmptyCartColour() {
      return this.userProfile.cart.length ? 'rgba(0, 0, 0, 0.75)' : ''
    },
    productsInCart() {
      return this.userProfile.cart.length
    },
    userGreeting() {
      return `Hello ${this.userProfile.username}`;
    },
    userIsLogged() {
      return this.authtoken
    }
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
    .v-application .light-blue {
          background-color: #03a8f4ab !important;
    }
    .router-link-active {
      border-radius: 6px;
      background-color: rgb(130, 229, 253);
    }
    
    /* Remove the leftover opacity on click */
    .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
      opacity: 0;
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