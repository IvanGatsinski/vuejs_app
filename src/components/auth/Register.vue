<template>
  <div>
    <h3>Register Form</h3>
    <form @submit.prevent="registerUser">
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
      <input type="submit"  value="REGISTER" />
    </form>
    <p>{{username}}</p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import { registerUser } from '../../api_calls/auth'

export default {
  name: 'Register',
  computed: {
    ...mapFields('auth', [
      'registerForm.username',
      'registerForm.password'
    ])
  },
  methods: {
    ...mapActions('auth',[
      'register'
    ]),
   registerUser() {
     const USER_DATA = {
       username: this.username,
       password: this.password
     }
     this.register(USER_DATA)
   },
  }
};
</script>

<style scope>
label {
  display: block;
  margin: 10px;
}
</style>
