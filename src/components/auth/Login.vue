<template>
  <div>
    <h3>Login Form</h3>
    <form @submit.prevent="loginUser">
      <label for="username">
        Username
        <input id="username" type="text" v-model="username" placeholder="enter username" />
      </label>
      <label for="password">
        Password
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="enter password"
        />
      </label>
      <input type="submit" value="LOG IN" />
    </form>
    <p></p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapFields } from 'vuex-map-fields'

export default {
  name: 'Login',
  computed: {
    ...mapFields([
      'loginForm.username',
      'loginForm.password'
    ])
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      const USER_INFO = {
        username: this.username,
        password: this.password
      };
      this.login(USER_INFO);
    }
  }
};
</script>

<style>
</style>
