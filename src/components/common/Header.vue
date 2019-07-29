<template>
  <header>
    <div v-if="userIsLogged">
      <h4>{{ userGreeting }}</h4>
    </div>
    <ul class="nav-menu">
      <div v-if="!userIsLogged" class="unlogged-user">
        <router-link to="/register" tag="li">Register</router-link>
        <router-link to="/login" tag="li">Login</router-link>
      </div>
      <div v-if="userIsLogged" class="logged-user">
        <router-link to="/" tag="li">Welcome</router-link>
        <router-link to="/product/create" tag="li">Add Product</router-link>
        <li @click="logoutUser">Logout</li>
      </div>
    </ul>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState('auth',[
      'username',
      'authToken',
      'userId'
    ]),
    userGreeting() {
      return `Hello ${this.username}`;
    },
    userIsLogged() {
      return this.authToken
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
div.logged-user {
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
}
</style>
