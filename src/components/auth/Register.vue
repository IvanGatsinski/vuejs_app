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

            <label for="age">
        Age
        <input
          id="age"
          type="age"
          v-model="age"
          placeholder="enter age"
        />
      </label>

            <label for="sex">
        Sex
        <input
          id="sex"
          type="sex"
          v-model="sex"
          placeholder="enter sex"
        />
      </label>

            <label for="city">
        City
        <input
          id="city"
          type="city"
          v-model="city"
          placeholder="enter city"
        />
      </label>

            <label for="county">
        County
        <input
          id="county"
          type="county"
          v-model="county"
          placeholder="enter county"
        />
      </label>

            <label for="phone">
        Phone number
        <input
          id="phone"
          type="phone"
          v-model="phone"
          placeholder="enter phone"
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
      'registerForm.password',
      'registerForm.age',
      'registerForm.sex',
      'registerForm.city',
      'registerForm.county',
      'registerForm.phone'
    ])
  },
  methods: {
    ...mapActions('auth',[
      'register'
    ]),
   registerUser() {
     const USER_DATA = {
       username: this.username,
       password: this.password,
       age: this.age,
       sex: this.sex,
       city: this.city,
       county: this.county,
       phone: this.phone,
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
