<template>
  <v-app-bar
    app
    color="light-blue "
    dark
  > 
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title v-show="userIsLogged">{{ userGreeting }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="!userIsLogged">
        <router-link to="/register">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-3">
            Register
            </v-btn>
        </router-link>
        <router-link to="/login">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-3">
            Login
            </v-btn>
        </router-link>
    </template>

    <template v-if="userIsLogged">
        <v-btn icon class="fav__items-btn">
            <v-icon :class="colorIfListNotEmpty" large>mdi-heart </v-icon><span class="fav__items-count">{{ favouriteProductsCount }}</span>
        </v-btn>
        <router-link to="/">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-3">
                <v-icon left color="light-green accent-3">mdi-home</v-icon> Home
            </v-btn>
        </router-link>  
        <router-link to="/myProfile">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-3">
                <v-icon left color="light-green accent-3">mdi-account-circle</v-icon> Profile
            </v-btn>
        </router-link>
        <router-link to="/logout">
            <v-btn rounded class="ma-1 py-1" tile color="light-blue darken-3" @click="logoutUser">
                <v-icon left color="light-green accent-3">mdi-logout</v-icon> Logout
            </v-btn>
        </router-link>
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
    favouriteProductsCount() {
      return this.userProfile.favouriteProducts.length;
    },
    colorIfListNotEmpty() {
      return this.userProfile.favouriteProducts.length ? 'fav__items-icon--color' : ''
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fav__items-btn:hover {
        background: transparent;
    }
    .fav__items-icon--color {
        color: #EF5350 !important;
    }
    span.fav__items-count {
        position: relative;
        transform: translate(5px, 5px);
    }
    .v-btn__content {
        margin-left: -30px;
    }
/* div.logged-user {
  color: rgb(2, 165, 43);
}
div.unlogged-user {
  color: rgb(173, 147, 0);
}
h3 {
  margin: 40px 0 0;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  cursor: pointer;
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>